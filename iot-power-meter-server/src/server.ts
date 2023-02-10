import app from './api/express';
import { Mqtt } from './api/mqtt';
import { fetchPowerRatesCron } from './services/power-rates/fetch-power-rates-cron';

const port = process.env.PORT || '3000';
app.listen(port);

// Wait until influxdb is ready
console.log('Waiting for influxdb...');
setTimeout(() => new Mqtt().init(), 60000);

fetchPowerRatesCron();
