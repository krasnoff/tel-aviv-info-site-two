import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class AppService {

  constructor (private _http: Http) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', '43eb0d9a-5597-44a9-94ac-226b07cd5361');
    headers.append('Access-Control-Allow-Origin', 'http://data.london.gov.uk');
  }

  getMethod(url: string) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    
    return this._http.get(url, { headers: headers })
        .map(res => res.json());
  }

}
