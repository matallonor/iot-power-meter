import * as mqtt from "mqtt";
import { ISubscriptionGrant, MqttClient } from 'mqtt';
import { IConnackPacket } from 'mqtt-packet';
import { saveMeasurement } from './controller/measurement.controller';

const host = '192.168.1.133';
const port = '1883';
const topic = 'power_consumption';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://${host}:${port}`;

export class Mqtt {

    client: MqttClient;

    public init(): void {
        this.client = mqtt.connect(connectUrl, {
            clientId,
            clean: false,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        });
        this.client.on('error', (err) => {
            console.log('error', err);
            this.client.end();
        });
        this.client.on('connect', (packet: IConnackPacket) => {
            console.log('Connected');
            this.subscribeToTopic();
        });
        this.client.on("reconnect", function() {
            console.log("client is reconnected");
        })
        this.client.on("error", function(err) {
            console.log("error from client --> ", err);
        })
        this.client.on("close", function(e) {
            console.log("client is closed", JSON.stringify(e));
        })
        this.client.on("offline", function(err) {
            console.log("client is offline");
        });
    }

    private subscribeToTopic() {
        this.client.subscribe([topic], { qos: 2 },(err: Error, granted: ISubscriptionGrant[]) => {
            if (err) {
                // TODO
                //  MeasurementEvent.emit('mqttSubscriptionError', err);
                console.log(err);
            }
            this.client.on('message', saveMeasurement);
        })
    }
}
