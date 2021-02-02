import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {CommonService} from '../../utils/common.service';

import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})

export class WorkSpaceSevelopmentDocumentService {
  role_id =this.commonService.getReviewerId();
  constructor(private http: HttpClient,private ngxService: NgxUiLoaderService,
    private commonService:CommonService) {
    
   }

  getDevelopmentDocumentationData(value: any, header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}workspace/docs/details?` + value, header)
      .toPromise()
      .then(data => {
        this.ngxService.stop();
        return data;
      });
  }



  formDataSave(formDataf: any, header: any) {
    this.ngxService.start();
    return this.http.post(`${environment.apiUrl}workspace/doc/upload`, formDataf, header)
        .pipe(map(data => { 
          this.ngxService.stop();
          return data; }));
  }
  onDownloadFile(params: any,header:any) {
    let uri;
    uri = `${environment.apiUrl}workspace/doc/download/attachment`;
    this.ngxService.start();
    return this.http.get(uri, { headers: header.headers, params: params, responseType: 'blob' })
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  saveComments(value: any,header:any) {
    this.ngxService.start();
    return this.http.post<any>(`${environment.apiUrl}workspace/review/comment`, value,header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  getAllReviewComments(id: any, header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}workspace/review/comments?micrositeId=${id.micrositeId}&workspaceId=${id.workspaceId}&workspaceDtlId=${id.workspaceDtlId}`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  getReviewerCombo(id: any, header: any) {
    this.ngxService.start();
    
    return this.http.get<any>(`${environment.apiUrl}workspace/team/user-byrole?workspaceId=${id.workspaceId}&micrositeId=${id.micrositeId}&roleId=${this.role_id}`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  getAssignedReviewer(id: any, header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}phase/mapped/reviewers?micrositeId=${id.micrositeId}&workspaceId=${id.workspaceId}&workspaceDtlId=${id.workspaceDtlId}`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  submitReviewer(value: any, header: any) {
    this.ngxService.start();
    return this.http.post<any>(`${environment.apiUrl}phase/reviewer/mapping`, value, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
}
