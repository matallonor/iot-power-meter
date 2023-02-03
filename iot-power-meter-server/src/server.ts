import app from './api/express';
import { Mqtt } from './api/mqtt';
import { fetchPowerRatesCron } from './services/power-rates/fetch-power-rates-cron';

const port = process.env.PORT || '3000';
app.listen(port);

new Mqtt().init();

fetchPowerRatesCron();
