import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { environment } from '../config/environment';
import { MeasurementModel } from './model/measurement.db';

const url = environment.influxdb.url;
const token = environment.influxdb.token;
const org = environment.influxdb.org;
const bucket = `${environment.influxdb.org}/autogen`;

const MEASUREMENT_NAME = 'power';

export class DB {

    private static _instance: DB;
    private influxDB: InfluxDB;

    private constructor()
    {
        this.influxDB = new InfluxDB({ url, token });
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    public read(startDate: Date, observer): FluxObserver<MeasurementModel> {
        const queryApi = new InfluxDB({url, token}).getQueryApi('');

        const fluxQuery = `from(bucket: "${bucket}")
                          |> range(start: ${startDate.getTime()/1000}, stop: now())
                          |> filter(fn: (r) => r["_measurement"] == "${MEASUREMENT_NAME}")
                          |> window(every: 1h)
                          |> reduce(fn: (r, accumulator) => ({
                                total: accumulator.total + r._value,
                              }),
                              identity: {total: 0.0}
                            )`;

        /*const fluxQuery = `from(bucket: "${bucket}")
                          |> range(start: ${startDate.getTime()/1000}, stop: now())
                          |> filter(fn: (r) => r["_measurement"] == "${MEASUREMENT_NAME}")
                          |> aggregateWindow(every: 1h, fn: sum)`;*/

        queryApi.queryRows(fluxQuery, observer);
        return observer;
    }

    public write(measurement: MeasurementModel) {
        const writeApi = this.influxDB.getWriteApi('', bucket, 'ms');

        const point1 = new Point(MEASUREMENT_NAME)
            .tag('hour', '0-1')
            .floatField('value', measurement.value)
            .timestamp(measurement.timestamp);

        writeApi.writePoint(point1);

        writeApi.close().then((result) => {
            console.log('WRITE FINISHED:', result);
        }).catch(err => console.error(err));
    }
}

export interface FluxObserver<T> {
    next(row, tableMeta): { [p: string]: T };
    error(error): void; complete(): void
}
