import * as cron from "node-cron";
import { getPowerRates } from './power-rates.service';
import { PowerRatesTable } from './power-rates-table';

export const fetchPowerRatesCron = () => {
    // Fetch the power rates the first time this gets called
    fetchRates();
    // And then fetch it every day at 0 AM
    cron.schedule("0 0 * * *", fetchRates).start();
};

const fetchRates = () => {
    getPowerRates().subscribe(rates => {
        const table = PowerRatesTable.Instance;
        table.fromJson(rates);
    });
};
