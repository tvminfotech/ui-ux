import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class WorkSpacePhaseService {

  constructor(private http: HttpClient,private ngxService: NgxUiLoaderService) {
    this.ngxService.start();  
   }
  getWorkspacePhase(header: any,wsPocId:any)
  {
    return this.http.get<any>(`${environment.apiUrl}workspace?micrositeId`+'='+localStorage.getItem('micrositeId') +'&pocId='+ wsPocId, header)
    .pipe(map(data => {
      this.ngxService.stop();
      return data; })
    );
  }
}
