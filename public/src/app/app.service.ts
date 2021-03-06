
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private rootUrl = '/api';

  public getLogs(): Observable<any> {
    return this.http.get(this.rootUrl + "/all")
      .pipe(catchError((err: any) => {
        return throwError(err);
      }));
  }

  public addLog(log: any): Observable<any> {
    return this.http.post(this.rootUrl + "/addLog", { log })
      .pipe(catchError((err: any) => {
        return throwError(err);
      }));      
  }
  
}
