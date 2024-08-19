import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';

const endpoint = `${environment.url}/v1/espgapi0002`;

@Injectable({
  providedIn: 'root',
})
export class ErroService extends BaseService {
  
  public getAll(rowid:any): Observable<any> {
    return this.getReg(`${endpoint}/${rowid}`);
  }

  /*
  public getDetails(page: number = 1, id: number): Observable<any> {
    return null;
  }
  */
}