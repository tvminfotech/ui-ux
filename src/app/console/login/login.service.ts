import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(value: any) {
    return this.http.post<any>(`${environment.apiUrl}authenticate`, value)
      .pipe(map(data => { return data; }),
        // catchError(this.handleError)
      );
  }

  getWorkSpaceboards(header: any) {
    return this.http.get<any>(`${environment.apiUrl}workspace-boards`, header)
      .pipe(map(data => { return data; }),
        // catchError(this.handleError)
      );
  }

  getLoggedInDetails(header: any) {
    return this.http.get<any>(`${environment.apiUrl}account`, header)
      .pipe(map(data => { return data; }),
        // catchError(this.handleError)
      );
  }
}
