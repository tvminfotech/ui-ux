import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceTeamService {
  // token = localStorage.getItem('tempCurrentUserToken');
  // header = {
  //   headers: new HttpHeaders()
  //     .set('Authorization', `Bearer ${this.token}`)
  // };
  // micrositeId = JSON.parse(localStorage.getItem('micrositeId'));
  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) {
  }

  getAllResources(microsite: any, header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}microsite/users?micrositeId=${microsite}`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }

  getAllRole(header: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}roles`,header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }

  onMapPocWithResource(params: any, header: any) {
    this.ngxService.start();
    return this.http.post<any>(`${environment.apiUrl}workspace/team/user`, params, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }

  getTeamDTL(id: any, header: any) {
    return this.http.get<any>(`${environment.apiUrl}workspace/team/users?micrositeId=${id.micrositeId}&workspaceId=${id.poc}`, header)
      .pipe(map(data => {
        return data;
      }),
      );
  }

}
