import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { ILogs } from './logs.model';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
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
  create(data): Observable<ILogs> {
    return this.http.post<ILogs>(this.baseUrl, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // GET
  find(id: number): Observable<ILogs> {
    return this.http.get<ILogs>(`${this.baseUrl}/${id}`)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // GET
  findAll(): Observable<ILogs[]> {
    return this.http.get<ILogs[]>(this.baseUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // PUT
  update(data: ILogs): Observable<ILogs> {
    return this.http.put<ILogs>(this.baseUrl, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // DELETE
  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions)
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

}
