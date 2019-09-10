import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private server = environment.server;

    constructor() {
    }

    prepareUrl(path: string, query?: any) {
        let q = '';
        let returnUrl = this.server + path;

        // if (returnUrl.substring(returnUrl.length - 1) != '/') {
        //     returnUrl += '';
        // }

        if (query) {
            q = '?';
            let c = 0;
            for (let key in query) {
                if (c > 0) {
                    q += '&';
                }
                if (query[key]) {
                    q += key + '=' + query[key];
                }
                c++;
            }
        }
        returnUrl += q;

        return returnUrl
    }
}
