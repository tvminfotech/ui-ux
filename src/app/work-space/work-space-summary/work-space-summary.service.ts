import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})

export class WorkSpaceSummaryService {
  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };
  constructor(private http: HttpClient, private ngxService: NgxUiLoaderService) { }

  getPOCDtl(id: any) {
    this.ngxService.start();
    return this.http.get<any>(`${environment.apiUrl}workspace/?micrositeId=${id.micrositeId}&pocId=${id.pocId}`, this.header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data;
      }),
      );
  }
}
