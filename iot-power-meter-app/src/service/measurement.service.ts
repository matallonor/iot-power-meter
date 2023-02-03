import { httpGet } from './http';
import { map } from 'rxjs';

export const getSpentToday = () => {
    return httpGet('/measurement/month').pipe(
        map(res => {
            if (res.status === 200) {
                return res.data;
            }
        })
    );
};
