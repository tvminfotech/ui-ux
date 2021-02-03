import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceFinancialsService {

  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) { }

    upload(value: any, header: any,isEdit:any) {
      this.ngxService.start();      

      if (!isEdit)
      {
      return this.http.post<any>(`${environment.apiUrl}workspace/estimation/doc/upload`, value, header)
        .pipe(map(data => {
          this.ngxService.stop();
          return data;
        }),
        );
      }
      else
      {
        return this.http.put<any>(`${environment.apiUrl}workspace/estimation/doc/upload`, value, header)
        .pipe(map(data => {
          this.ngxService.stop();
          return data;
        }),
        );
      }
    }
    download(params: any,header:any) {
      let uri;
      uri = `${environment.apiUrl}workspace/estimation/doc/download`;
      this.ngxService.start();
      return this.http.get(uri, { headers: header.headers, params: params, responseType: 'blob' })
        .pipe(map(data => {
          this.ngxService.stop();
          return data;
        }),
        );
    }
    getEstimationHeaderInfo(id: any, header: any) {
      this.ngxService.start();
      return this.http.get<any>(`${environment.apiUrl}workspace/estimations?micrositeId=${id.micrositeId}&workspaceId=${id.workspaceId}`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
    }
    getEstimationDetailInfo(id: any, header: any) {
      this.ngxService.start();
      return this.http.get<any>(`${environment.apiUrl}workspace/estimation/details?micrositeId=${id.micrositeId}&workspaceId=${id.workspaceId}`, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
    }
}
