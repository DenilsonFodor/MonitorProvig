import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';

const endpoint = `${environment.url + environment.api}/espgapi0003`;
var header = new HttpHeaders().set('Authorization', "Basic " + btoa(environment.auth))

@Injectable({
  providedIn: 'root',
})
export class HistoricoService  {
  
  constructor(private http: HttpClient) {}

  public getOne(rowid: string): Observable<any> {
    return this.http.get(endpoint + '/' + rowid, {headers: header});
  }
  /*
  public getDetails(page: number = 1, id: number): Observable<any> {
    return null;
  }
    */

}
