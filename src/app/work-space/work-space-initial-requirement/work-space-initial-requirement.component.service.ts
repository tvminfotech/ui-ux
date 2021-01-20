import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})

export class WorkSpaceInitialRequirementService {
  micrositeId:any;
  constructor(private http: HttpClient,private ngxService: NgxUiLoaderService) { 
    this.micrositeId =localStorage.getItem('micrositeId');
    this.ngxService.start();
   }
  formDataSave(reqdata: any, header: any, isEdit: any) {
    this.ngxService.start();
    if (isEdit) {
      return this.http.put(`${environment.apiUrl}poc/init/requirement`, reqdata, header)
        .pipe(map(data => { 
          this.ngxService.stop();
          return data; }));
    } else {
      return this.http.post(`${environment.apiUrl}poc/init/requirement`, reqdata, header)
        .pipe(map(data => { 
          this.ngxService.stop();
          return data; }));
    }
  }
  initInitialRequirement(pocId: any,boardMapId:any, header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}poc/init/requirement?micrositeId`+'='+this.micrositeId +'&pocId='+ pocId +'&pocBoardMapId='+ boardMapId, header)
      .toPromise()
      .then(data => {
        this.ngxService.stop();
        return data;
      });
  }
}
