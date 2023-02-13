import moment from 'moment/moment';
import { PowerRate, PowerRatesTable } from '../power-rates/power-rates-table';

export interface PowerConsumed {

    date: Date,
    hour: string;
    power: number;
    cost: number;
}

export const toPowerConsumed = (o): PowerConsumed => {
    let hour = `${moment(o._start).format('HH')}-${moment(o._stop).format('HH')}`;
    const hours = hour.split('-');
    if (hours[0] === hours[1]) {
        hour = `${hours[0]}-${Number(hours[1]) + 1}`;
    }
console.log(hour);
    const rate: PowerRate = PowerRatesTable.Instance.get(hour);
    // const rate: PowerRate = { hour: '1', price: 120 };
    return { date: o._start, hour, power: o._value, cost: o.total * (rate?.price | 1) };
}
