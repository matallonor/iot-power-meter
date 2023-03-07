import { MeasurementDB } from '../../db/model/measurement.db';
import { PowerConsumptionService } from '../../services/power-consumption/power-consumption.service';

export const saveMeasurement = (message: string) => {
    PowerConsumptionService.saveData(message);
};

export const getMeasurement = async (req, res) => {
    MeasurementDB.getTodaysMeasurements().subscribe({
        next: (powerConsumed) => {
            res.status(200).json({
                message: "Found",
                powerConsumed,
            });
        },
        error: (error) => {
            res.status(400).json({
                message: "Bad Request",
                error,
            });
        }
    });
};

export const getMonthMeasurement = async (req, res) => {
    MeasurementDB.getMonthsMeasurements().subscribe({
        next: (powerConsumed) => {
            res.status(200).json({
                message: "Found",
                powerConsumed,
            });
        },
        error: (error) => {
            res.status(400).json({
                message: "Bad Request",
                error,
            });
        }
    });
};
