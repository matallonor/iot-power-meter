export interface PowerRate {
    hour: string;
    price: number;
}

export class PowerRatesTable {

    private static _instance: PowerRatesTable;
    private map: Map<string, PowerRate>;

    private constructor()
    {
        this.map = new Map<string, PowerRate>();
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    getAll() {
        return this.map;
    }

    get(hour: string) {
        return this.map.get(hour);
    }

    add(rate: PowerRate) {
        this.map.set(rate.hour, rate);
    }

    fromJson(json: JSON) {
        if (json) {
            this.map = new Map<string, PowerRate>();
            Object.values(json).forEach(val => {
                const h = { hour: val.hour, price: val.price };
                this.add(h);
            });
        }
    }
}
