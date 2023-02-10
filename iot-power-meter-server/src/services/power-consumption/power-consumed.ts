import moment from 'moment/moment';
import { PowerRate, PowerRatesTable } from '../power-rates/power-rates-table';

export interface PowerConsumed {

    date: Date,
    hour: string;
    power: number;
    cost: number;
}

export const toPowerConsumed = (o): PowerConsumed => {
    const hour = `${moment(o._start).format('HH')}-${moment(o._stop).format('HH')}`;
    const rate: PowerRate = PowerRatesTable.Instance.get(o.hour);
    console.log(rate);
    console.log(o);
    // const rate: PowerRate = { hour: '1', price: 120 };
    return { date: o._start, hour, power: o._value, cost: o.total * (rate?.price | 1) };
}
