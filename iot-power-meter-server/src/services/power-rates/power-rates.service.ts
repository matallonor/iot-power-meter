import axios from 'axios';
import { catchError, from, map, Observable } from 'rxjs';
import { environment } from '../../config/environment';

const http = axios.create({
    baseURL: environment.powerRateApi,
});

export function getPowerRates(): Observable<JSON> {
    return from(http.get('/prices/all?zone=PCB')).pipe(
        map((res) => {
            if (res.status === 200) {
                return res.data;
            }
        }),
        catchError(err => err)
    );
}
