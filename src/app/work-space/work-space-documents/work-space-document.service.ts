import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {
  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };

  constructor(private http: HttpClient) { }

  getDevelopmentDocumentationData(value: any, header: any) {
    return this.http.get<any>(`${environment.apiUrl}poc/docs/details?` + value, header)
      .toPromise()
      .then(data => {
        return data;
      });
  }


  formDataSave(formDataf: any, header: any) {
    // this.http.post(`${environment.apiUrl}poc/doc/upload`, formDataf, header).subscribe(
    //   (res) => {
    //     return res;
    //   },
    //   (err) => console.log(err)

    // );

    return this.http.post(`${environment.apiUrl}poc/doc/upload`, formDataf, header)
      .pipe(map(data => { return data; }));
  }

  onDownloadFile(params: any) {
    let uri;
    uri = `${environment.apiUrl}poc/doc/download`;
    return this.http.get(uri, { headers: this.header.headers, params: params, responseType: 'blob' })
      .pipe(map(data => {
        return data;
      }),
      );
  }

}