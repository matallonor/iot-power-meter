import axios, { AxiosResponse } from 'axios';
import { environment } from '../../environment';
import { from, Observable } from 'rxjs';

const http = axios.create({
    baseURL: environment.apiBaseUrl || "http://localhost:8085",
});

export function httpGet(url: string, params: object = null): Observable<AxiosResponse> {
    //http.get("http://192.168.1.133:8084"+url, { params }).then(res => console.log(res)).catch(err => console.log(err));
    return from(http.get(url, { params }));
}

export default http;
