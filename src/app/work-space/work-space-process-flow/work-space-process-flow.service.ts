import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {CommonService} from '../../utils/common.service';
@Injectable({
  providedIn: 'root'
})
export class WorkSpaceProcessFlowService {
  role_id =this.commonService.getReviewerId();
  /*
  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };
  */
  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private commonService:CommonService) {
    
  }
  getAllUploadedFile(id: any, header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}workspace/docs/details?micrositeId=${id.micrositeId}&workspaceId=${id.pocId}&workspaceDtlId=${id.pocBoardMapId}`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  onDownloadFile(params: any, header: any) {
    this.ngxService.start();
    let uri;
    uri = `${environment.apiUrl}workspace/doc/download/attachment`;
    return this.http.get(uri, { headers: header.headers, params: params, responseType: 'blob' })
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  getAllRoleId(header) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}roles`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }));
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
  submitReviewer(value: any, header: any) {
    this.ngxService.start();
    return this.http.post<any>(`${environment.apiUrl}phase/reviewer/mapping`, value, header)
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
  getAllReviewComments(id: any, header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}workspace/review/comments?micrositeId=${id.micrositeId}&workspaceId=${id.workspaceId}&workspaceDtlId=${id.workspaceDtlId}`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  getAllStatus(header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}status`, header)
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
}
