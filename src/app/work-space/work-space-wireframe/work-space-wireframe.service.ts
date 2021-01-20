import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceWireframeService {

  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };
  micrositeId = JSON.parse(localStorage.getItem('micrositeId'));
  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) {
  }
  submitReviewer(value: any) {
    this.ngxService.start();
    return this.http.post<any>(`${environment.apiUrl}poc/doc/reviewer/mapping`, value, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  getReviewerCombo(id: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}poc/team/user/byrole?pocId=${id.poc}&teamId=${id.team}&roleId=${id.role}`, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  getAllAssignedReviewer(id: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}poc/doc/assigned/reviewer?micrositeId=${id.microId}&pocId=${id.pocId}&docId=${id.docId}`, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  onLoadTable(id: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}poc/doc/review/comments?pocId=${id.poc}&docId=${id.docId}`, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  getAllStatus() {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}status`, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
  onSaveLink(value: any) {
    this.ngxService.start();
    return this.http.post<any>(`${environment.apiUrl}poc/xd/link`, value, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }


  getLinkDetails(id: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}poc/xd/links?micrositeId=${id.micrositeId}&pocId=${id.pocId}&pocBoardMapId=${id.pocBoardMapId}`, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
}
