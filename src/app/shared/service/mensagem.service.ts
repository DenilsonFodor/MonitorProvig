import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';

const endpoint = `${environment.url}/v1/espgapi0001`;

@Injectable({
  providedIn: 'root',
})
export class MensagemService extends BaseService {
  
  public getAll(filter: any): Observable<any> {
    return this.getReg(`${endpoint}`, filter);
  }

  public getOne(rowid: string): Observable<any> {
    return this.getReg(`${endpoint}/${rowid}`);
  }

  /*
  public getDetails(page: number = 1, id: number): Observable<any> {
    return null;
  }
    */

  public setObservacao(jsonEntrada: any): Observable<any> {
    return this.putObs(`${endpoint}`,jsonEntrada);
  }

}
