"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mqtt = void 0;
const mqtt = __importStar(require("mqtt"));
const rxjs_1 = require("rxjs");
const host = '192.168.1.133';
const port = '1883';
const topic = 'myTopic';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://${host}:${port}`;
class Mqtt {
    init() {
        this.client = mqtt.connect(connectUrl, {
            clientId,
            clean: true,
            connectTimeout: 4000,
            // username: 'emqx',
            // password: 'public',
            reconnectPeriod: 1000,
        });
        this.client.on('connect', (packet) => {
            console.log('Connected');
        });
    }
    connect() {
        const observable = new rxjs_1.Subject();
        this.client.subscribe([topic], (err, granted) => {
            if (err) {
                observable.error(err);
            }
            this.client.on('message', (topic, payload) => {
                observable.next(`Received Message: ${payload.toString()}`);
            });
        });
        return observable.asObservable();
    }
    publish(message) {
        this.client.publish(topic, message, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error);
            }
        });
    }
}
exports.Mqtt = Mqtt;
//# sourceMappingURL=power-rates.js.map
