import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceUploadImageService {
  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };
  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) {
    
  }
  onUpload(value: any, isEdit: any) {
    this.ngxService.start();
    if (isEdit) {
      return this.http.put<any>(`${environment.apiUrl}workspace/doc/upload`, value, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
    }
    else
    {
    return this.http.post<any>(`${environment.apiUrl}workspace/doc/upload`, value, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
    }
  }
  getDocuments(id: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}workspace/doc/names?micrositeId=${id.micrositeId}&workspaceId=${id.pocId}&workspaceDtlId=${id.pocBoardMapId}`, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
}
