import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
  })
export class BaseService {
    options: any = {};

    constructor(private http: HttpClient) {

      this.options = this.options.append(
          "Authorization",
          "Basic " + btoa(environment.auth)
      );
    }
    
    putObs(url:string, obj:any ): Observable<any> { 
        return this.http.post(url, obj, {headers: this.options});
    }

    getReg(url:string, filter:any = null, lock = true): Observable<any> {
        this.options = this.options.delete("X-Totvs-Screen-Lock");
        this.options = this.options.append("X-Totvs-Screen-Lock",lock.toString()); 

        return this.http.get(url, {        
            headers: this.options,
            withCredentials: true,
            params:filter
        });
    }


   
}

