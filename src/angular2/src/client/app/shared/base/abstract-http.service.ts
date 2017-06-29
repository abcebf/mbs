import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/catch';
// Or more generally this if you want to have more methods for observables:
import 'rxjs/Rx';

import { Config } from '../config/env.config';

@Injectable()
export abstract class AbstractHttpService {
  private basePath = Config.API;

  constructor(protected http:Http) {
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.http.get(this.basePath + url, options)
      .map((response:Response) => response.json())
      .catch(this.handleError);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    if (!options ) {
      options = {};
    }
    if (!options.headers || !options.headers.has('Content-Type')) {
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
    }

    return this.http.post(this.basePath + url, JSON.stringify(body), options)
      .map((response:Response) => response.json())
      .catch(this.handleError);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    if (!options ) {
      options = {};
    }
    if (!options.headers || !options.headers.has('Content-Type')) {
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
    }

    return this.http.put(this.basePath + url, JSON.stringify(body), options)
      .map((response:Response) => response.json())
      .catch(this.handleError);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.http.delete(this.basePath + url, options)
      .map((response:Response) => response.json())
      .catch(this.handleError);
  }

  /**
   * @param error
   * @returns {Promise<void>|Promise<T>}
   */
  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Network error!';

    if (error instanceof Response) {
      console.log(' error is an object of Response');
      console.log('in service, error is of type Response');
      console.log('error status: ' + error.status);
      console.log('error status text: ' + error.statusText);
      console.log('error type: ' + error.type);

      // console.log('error message: --> ' + (error.json()).error.message);
      // console.log('error code: --> ' + (error.json()).error.code);

    }

    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
