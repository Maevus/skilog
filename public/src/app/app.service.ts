
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

  rootUrl = '/api';

  public getLogs() {
    this.http.get(this.rootUrl + "/all");1
  }

  public addLog(log: any) {
    this.http.post(this.rootUrl + "/addLog", {log});
  }
}
