import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(): Observable<any> {
    return this.httpClient.get(`${this.REST_API_SERVER}/products`);
  }
}
