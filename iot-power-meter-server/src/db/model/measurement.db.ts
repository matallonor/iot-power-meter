import { DB } from '../db';
import { DateUtil } from '../../util/date-util';
import { Observable, Subject } from 'rxjs';
import { PowerConsumed, toPowerConsumed } from '../../services/power-consumption/power-consumed';

export interface MeasurementModel {
    value: number;
    timestamp: number;
}

export class MeasurementDB {

    static create(message: string): void {
        const [value, timestamp] = message.split('-'); 
        const measurement: MeasurementModel = { value: Number(value), timestamp: Number(timestamp) };
        DB.Instance.write(measurement);
    }

    static getTodaysMeasurements(): any {
        const observable = new Subject<Array<PowerConsumed>>();
        const powerConsumed: Array<PowerConsumed> = new Array<PowerConsumed>();
        DB.Instance.read(DateUtil.todayAtZeroAM(), {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row);
                powerConsumed.push(toPowerConsumed(o));
            },
            error(error) {
                observable.error(error);
            },
            complete() {
                observable.next(powerConsumed);
            }
        });
        return observable;
    }

    static getMonthsMeasurements(): Observable<Array<PowerConsumed>> {
        const observable = new Subject<Array<PowerConsumed>>();
        const powerConsumed: Array<PowerConsumed> = new Array<PowerConsumed>();
        DB.Instance.read(DateUtil.startOfMonth(), {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row);
                console.table(o);
                const pc = toPowerConsumed(o);
                powerConsumed.push(pc);
            },
            error(error) {
                observable.error(error);
            },
            complete() {
                observable.next(powerConsumed);
            }
        });
        return observable;
    }
}
