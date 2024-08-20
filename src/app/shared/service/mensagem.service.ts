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
  //export class MensagemService extends BaseService {
  /*
  public getAll(filter: any): Observable<any> {
    return this.getReg(`${endpoint}`, filter);
  }*/

    constructor(private http: HttpClient) {}


    public getAll(filtros:any): Observable<any> {
      return this.http.get<any>(endpoint,{headers:header, params:filtros});
    }
/*
  public getOne(rowid: string): Observable<any> {
    return this.getReg(`${endpoint}/${rowid}`);
  }
*/
  /*
  public getDetails(page: number = 1, id: number): Observable<any> {
    return null;
  }
    */
    
/*
  public setObservacao(jsonEntrada: any): Observable<any> {
    return this.putObs(`${endpoint}`,jsonEntrada);
  }
*/
public setObservacao(jsonEntrada: any): Observable<any> {
  return this.http.put(endpoint, jsonEntrada, { headers: header });
}

}
