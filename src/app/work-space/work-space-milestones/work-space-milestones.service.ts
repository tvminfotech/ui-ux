import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceMilestonesService {

  constructor(private http: HttpClient,private ngxService: NgxUiLoaderService) { }
  getMilestones(id: any, header) {
      this.ngxService.start();
      return this.http.get<any>(`${environment.apiUrl}workspace/milestones?micrositeId=${id.micrositeId}&workspaceId=${id.workspaceId}`, header)
        .pipe(map(data => {
          this.ngxService.stop();
          return data;
        }),
        );
    }
    complete(reqdata: any, header: any) {
      this.ngxService.start();
      return this.http.put(`${environment.apiUrl}workspace/milestone`, reqdata, header)
          .pipe(map(data => { 
            this.ngxService.stop();
            return data; }));
    }
}
