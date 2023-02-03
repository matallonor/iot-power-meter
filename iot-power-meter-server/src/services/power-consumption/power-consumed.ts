import moment from 'moment/moment';
import { PowerRate } from '../power-rates/power-rates-table';

export interface PowerConsumed {

    date: Date,
    hour: string;
    power: number;
    cost: number;
}

export const toPowerConsumed = (o): PowerConsumed => {
    const hour = `${moment(o._start).format('HH')}-${moment(o._end).format('HH')}`;
    // const rate: PowerRate = PowerRatesTable.Instance.get(o.hour);
    const rate: PowerRate = { hour: '1', price: 120 };
    return { date: o._start, hour, power: o._value, cost: o._value * rate.price };
}
