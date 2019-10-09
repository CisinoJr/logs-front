import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { ILogs } from './logs.model';
import { retry, catchError, map, tap } from 'rxjs/operators';
import * as _moment from 'moment';

import { HttpParams } from '@angular/common/http';
import { ISearchCriteria } from './search-criteria.model';

const moment = _moment;

type EntityResponseType = HttpResponse<ILogs>;
type EntityArrayResponseType = HttpResponse<ILogs[]>;

@Injectable({ providedIn: 'root' })
export class LogsDataService {

  private baseUrl = `${environment.apiUrl}/logs`;

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  // POST
  create(data: ILogs): Observable<EntityResponseType> {
    return this.http.post<ILogs>(this.baseUrl, JSON.stringify(data), { headers: this.httpOptions.headers, observe: 'response' })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // GET
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILogs>(`${this.baseUrl}/${id}`, { observe: 'response' })
      .pipe(
        map((response: EntityResponseType) => this.convertDateFromServer(response)),
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // GET
  findAll(req?: any, searchCriteria?: ISearchCriteria): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.post<ILogs[]>(`${this.baseUrl}/all`,
      JSON.stringify(this.convertDateToServer(searchCriteria)),
      { headers: this.httpOptions.headers, params: options, observe: 'response' }).
      pipe(
        map((response: EntityArrayResponseType) => this.convertDateArrayFromServer(response)),
        retry(3),
        catchError(this.errorHandler),
      );
  }

  // PUT
  update(data: ILogs): Observable<EntityResponseType> {
    return this.http.put<ILogs>(this.baseUrl, JSON.stringify(data), { headers: this.httpOptions.headers, observe: 'response' })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // DELETE
  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { observe: 'response' })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // Error handling
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  private convertDateToServer(searchCriteria: ISearchCriteria): ISearchCriteria {
    if (searchCriteria) {
      searchCriteria.startDate = searchCriteria.startDate ? moment(searchCriteria.startDate) : null;
      searchCriteria.endDate = searchCriteria.endDate ? moment(searchCriteria.endDate) : null;
      return searchCriteria;
    }
  }

  private convertDateFromServer(res: EntityResponseType): EntityResponseType {
    res.body.logDate = res.body.logDate != null ? moment(res.body.logDate) : null;
    return res;
  }

  private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    res.body.forEach((log: ILogs) => {
      log.logDate = log.logDate != null ? moment(log.logDate) : null;
    });
    return res;
  }

}

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key]);
      }
    });
    if (req.sort) {
      req.sort.forEach(val => {
        options = options.append('sort', val);
      });
    }
  }
  return options;
};
