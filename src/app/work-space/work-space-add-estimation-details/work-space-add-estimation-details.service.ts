import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceAddEstimationDetailsService {
  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };
  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) {    
  }
  save(value: any, isEdit: any,header:any) {
    this.ngxService.start();
    if (isEdit) {
      return this.http.put<any>(`${environment.apiUrl}workspace/estimation/details`, value, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
    }
    else
    {
    return this.http.post<any>(`${environment.apiUrl}workspace/estimation/details`, value, header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
    }
  }
  
}
