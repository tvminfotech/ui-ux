import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceListService {

  constructor(private http: HttpClient,private ngxService: NgxUiLoaderService) { 
    this.ngxService.start();  
  }
  getWorkSpaceList(header: any) {       
    return this.http.get<any>(`${environment.apiUrl}microsite/workspaces?micrositeId`+'='+localStorage.getItem('micrositeId'), header)
      .pipe(map(data => {
        this.ngxService.stop();
        return data; })
      );
  }
}
