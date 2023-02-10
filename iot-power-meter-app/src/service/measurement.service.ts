import { httpGet } from './http';
import { map, catchError } from 'rxjs';

export const getSpentToday = () => {
    return httpGet('/measurement/month').pipe(
        map(res => {
            if (res.status === 200) {
                return res.data;
            }
            console.log(res);
        }),
        catchError(err => {
            console.log(err);
            return err;
        })
    );
};
