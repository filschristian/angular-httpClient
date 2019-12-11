import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'http://localhost:3000';
  public first: string;
  public prev: string;
  public next: string;
  public last: string;

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(): Observable<any> {
    return this.httpClient
    .get(`${this.REST_API_SERVER}/products`, {  params: new HttpParams({fromString: '_page=1&_limit=20'}), observe: 'response'})
    .pipe(tap(res => {
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  public sendGetRequestToUrl(url: string) {
    return this.httpClient.get(url, { observe: 'response'}).pipe(tap(res => {
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  parseLinkHeader(header) {
    if (header.length === 0) {
      return ;
    }
    const parts = header.split(',');
    const links: any = {};
    parts.forEach( p => {
      const section = p.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });
    this.first  = links.first;
    this.last   = links.last;
    this.prev   = links.prev;
    this.next   = links.next;
  }
}
