import { MeasurementDB } from '../../db/model/measurement.db';

export class PowerConsumptionService {
    static saveData(measurement: string): void {
        MeasurementDB.create(measurement);
    }
}
