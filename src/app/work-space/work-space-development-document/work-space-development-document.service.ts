import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})

export class WorkSpaceSevelopmentDocumentService {
  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };
  constructor(private http: HttpClient,private ngxService: NgxUiLoaderService) {
    
   }

  getDevelopmentDocumentationData(value: any, header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}poc/docs/details?` + value, header)
      .toPromise()
      .then(data => {
        this.ngxService.stop();
        return data;
      });
  }



  formDataSave(formDataf: any, header: any) {
    this.ngxService.start();
    return this.http.post(`${environment.apiUrl}poc/doc/upload`, formDataf, header)
        .pipe(map(data => { 
          this.ngxService.stop();
          return data; }));
  }
  onDownloadFile(params: any) {
    let uri;
    uri = `${environment.apiUrl}poc/doc/download`;
    this.ngxService.start();
    return this.http.get(uri, { headers: this.header.headers, params: params, responseType: 'blob' })
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
}
