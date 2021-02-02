import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {CommonService} from '../../utils/common.service';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceWireframeService {
  role_id =this.commonService.getReviewerId();
  // token = localStorage.getItem('tempCurrentUserToken');
  // header = {
  //   headers: new HttpHeaders()
  //     .set('Authorization', `Bearer ${this.token}`)
  // };
  // micrositeId = JSON.parse(localStorage.getItem('micrositeId'));
  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private commonService:CommonService) {
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
  getAllReviewComments(id: any, header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}workspace/review/comments?micrositeId=${id.micrositeId}&workspaceId=${id.workspaceId}&workspaceDtlId=${id.workspaceDtlId}`, header)
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
  getAllStatus(header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}status`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  onSaveLink(value: any, method: string, header: any) {
    this.ngxService.start();
    if (method === "SAVE") {
      return this.http.post<any>(`${environment.apiUrl}workspace/xd/link`, value, header)
        .pipe(map(data => {
          this.ngxService.stop();
          return data;
        }),
        );
    } else if (method === "UPDATE") {
      return this.http.put<any>(`${environment.apiUrl}workspace/xd/link`, value, header)
        .pipe(map(data => {
          this.ngxService.stop();
          return data;
        }),
        );
    }
  }


  getLinkDetails(id: any, header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}workspace/xd/links?micrositeId=${id.micrositeId}&workspaceId=${id.pocId}&workspaceDtlId=${id.pocBoardMapId}`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
}
