import { environment } from '../config/environment';

export class DateUtil {

    static todayAtZeroAM = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        return new Date(`${mm}/${dd}/${yyyy}`);
    }

    static startOfMonth = () => {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        return new Date(`${mm}/${environment.billingStartDay}/${yyyy}`);
    }
}
