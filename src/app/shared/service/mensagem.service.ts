import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';

const endpoint = `${environment.url + environment.api}/espgapi0001`;
var header = new HttpHeaders().set('Authorization', "Basic " + btoa(environment.auth))

@Injectable({
  providedIn: 'root',
})
export class MensagemService {

  constructor(private http: HttpClient) {}

  public getAll(filtros:any): Observable<any> {
    return this.http.get<any>(endpoint,{headers:header, params:filtros});
  }

  public getOne(rowid: string): Observable<any> {
      return this.http.get(endpoint + '/' + rowid, {headers: header});
  }
    
  public setObservacao(jsonEntrada: any): Observable<any> {
    return this.http.post(endpoint, jsonEntrada, { headers: header });
  }

}
