import {ConfigService} from "./config.service";
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

    protected endpoint = '';

    constructor(protected appConfig: ConfigService) {
    }

    getRoute(p: string, q?: any) {
        return this.appConfig.prepareUrl(this.endpoint + p, q);
    }
}
