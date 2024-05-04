import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Services
import { handleErrorAsIResponse } from './error.service';
import { isIResponse } from './interface.service';

// Interfaces & Models
import { IResponse } from '../interfaces/iresponse';

// Enums & Constants
import { HttpHeaderEnum } from '../enums/global.enum';
import { HTTP_ERROR } from '../constants/http-error';
const { Ok } = HTTP_ERROR;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getEntities = <T>(service: Observable<IResponse>): Observable<Array<T>> => {
    return service.pipe(
      map(response => {
        let entities = new Array<T>();

        if (response.status === Ok.status) {
          entities = response.data as Array<T>;
        } else {
          console.error(`ERROR:`, response);
        }

        return entities;
      })
    );
  }

  getEntity = <T>(service: Observable<IResponse>): Observable<T> => {
    return service.pipe(
      map(response => {
        let entity = {} as T;

        if (response.status === Ok.status) {
          entity = response.data as T;
        } else {
          console.error(`ERROR:`, response);
        }

        return entity;
      })
    );
  }

  getSomeHeaders = (accept?: string, contentType?: string, authorization?: string): HttpHeaders => {
    const headers = new HttpHeaders();

    headers.append('Accept', accept ?? HttpHeaderEnum.All);
    headers.append('Content-Type', contentType ?? HttpHeaderEnum.ApplicationJson);

    if (authorization) {
      headers.append('Authorization', `Bearer: ${authorization}`);
    }

    return headers;
  }

  private handleResponse = (response: any): IResponse => {
    if (isIResponse(response)) {
      return response;
    }
    return { ...Ok, message: 'Original response is not a IResponse entity', data: response };
  }

  httpDelete(url: string, options: any = { headers: this.getSomeHeaders() }): Observable<IResponse> {
    return this.http.delete<IResponse>(url, options).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleErrorAsIResponse(err)))
    );
  }

  httpGet(url: string, options: any = { headers: this.getSomeHeaders() }): Observable<IResponse> {
    return this.http.get<IResponse>(url, options).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleErrorAsIResponse(err)))
    );
  }

  httpJsonP = (url: string): Observable<IResponse> => {
    return this.http.jsonp(url, 'callback').pipe(
      map(response => this.handleResponse(response)),
      catchError((err: any) => of(handleErrorAsIResponse(err)))
    );
  }

  httpPost(url: string, body: any = {}, options: any = { headers: this.getSomeHeaders() }): Observable<IResponse> {
    return this.http.post<IResponse>(url, body, options).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleErrorAsIResponse(err)))
    );
  }

  httpPut(url: string, body: any, options: any = { headers: this.getSomeHeaders() }): Observable<IResponse> {
    return this.http.put<IResponse>(url, body, options).pipe(
      map((response: any) => this.handleResponse(response)),
      catchError((err: any) => of(handleErrorAsIResponse(err)))
    );
  }
}
