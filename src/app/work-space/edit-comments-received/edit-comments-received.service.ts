import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {CommonService} from '../../utils/common.service';

@Injectable({
  providedIn: 'root'
})
export class EditCommentsReceivedService {
  role_id =this.commonService.getDeveloperId();
  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private commonService:CommonService) { }

    getDeveloperCombo(id: any, header: any) {
      this.ngxService.start();
      
      return this.http.get<any>(`${environment.apiUrl}workspace/team/user-byrole?workspaceId=${id.workspaceId}&micrositeId=${id.micrositeId}&roleId=${this.role_id}`, header)
        .pipe(map(data => {
          this.ngxService.stop();
          return data;
        }),
        );
    }
    accept(value: any,header:any) {
      this.ngxService.start();
      return this.http.put<any>(`${environment.apiUrl}workspace/review/comment`, value,header)
        .pipe(map(data => {
          this.ngxService.stop();
          return data;
        }),
        );
    }
    save(value: any,header:any) {
      this.ngxService.start();
      return this.http.put<any>(`${environment.apiUrl}workspace/review/comment/status`, value,header)
        .pipe(map(data => {
          this.ngxService.stop();
          return data;
        }),
        );
    }
}
