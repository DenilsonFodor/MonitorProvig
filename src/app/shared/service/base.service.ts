import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

var header = new HttpHeaders().set('Authorization', "Basic " + btoa(environment.auth))

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  //private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    /*
    this.headers = new HttpHeaders().append(
      "Authorization",
      "Basic " + btoa(environment.auth)
    );
    */
  }

  putObs(url: any, obj: any): Observable<any> {
    return this.http.put(url, obj, { headers: header });
  }

  getReg(url: any, filter: any = null, lock: boolean = true): Observable<any> {
    let headers = header.delete("X-Totvs-Screen-Lock");
        headers = header.append("X-Totvs-Screen-Lock", lock.toString());

    const params = new HttpParams({ fromObject: filter });

    return this.http.get(url, {
      headers: headers,
      withCredentials: true,
      params: params,
    });
  }
}


