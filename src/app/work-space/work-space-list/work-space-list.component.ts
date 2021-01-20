import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { WorkSpaceListService } from './work-space-list.service';
import { EnvironmentService } from 'src/environments/environment.service';
import { CommonService } from '../../utils/common.service';

@Component({
  selector: 'app-work-space-list',
  templateUrl: './work-space-list.component.html',
  styleUrls: ['./work-space-list.component.css']
})
export class WorkSpaceListComponent implements OnInit {

  constructor(private route: Router, private Service: WorkSpaceListService, private actRoute: ActivatedRoute,
    private environmentService: EnvironmentService, private commonService: CommonService) { }
  workSpacelist = [];
  wsPocId: any;
  isCreateWorkSpace: any;
  ngOnInit(): void {

    this.getWorkSpaceList(localStorage.getItem('tempCurrentUserToken'));
  }
  getWorkSpaceList(token: any) {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    };
    setTimeout(() => {
      this.Service.getWorkSpaceList(header)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.workSpacelist = data.result_data;
            if (localStorage.getItem("alreadyLogin") == null) {
              localStorage.setItem("alreadyLogin", "Yes");
              if (this.workSpacelist.length == 0) {
                if (this.commonService.getRole() == 'idea-owner') {
                  this.createWorkspace();
                }
                else
                this.route.navigate(['/workspace/no-workspace']);
              }
              else {
                var POCobj =this.workSpacelist[0];
               this.view(POCobj.id,POCobj.pocName);
              }
            }
            /*
            let defaultBoardsobj :object= {};             
            this.workSpacelist.forEach(element => {
              //console.log(element['id'],element["boardNames"][0].id)
              let elementobj :object= {};
              elementobj[element["boardNames"][0].id] = element["boardNames"][0].boardCode;
              defaultBoardsobj[element['id']] = elementobj
            });
            //console.log(defaultBoardsobj)
            localStorage.setItem('defaultBoards', JSON.stringify(defaultBoardsobj))
            */
          },
          error => {
          });
    });
  }
  view(workspaceId, workspaceName) {
    this.environmentService.setWSSubMenu('null');
    this.environmentService.setPOCId(workspaceId);
    this.route.navigateByUrl('/workspace/view/' + workspaceId + '/' + workspaceName + '/summary');
  }
  createWorkspace() {
    this.environmentService.setPOCId('null');
    this.route.navigateByUrl('/workspace/createworkspace');
  }
  ngAfterViewChecked() {
    var routeURL = this.route.url;
    var routeURLSplit = routeURL.split("/");
    if (routeURL.indexOf('createworkspace') > 0) {
      this.isCreateWorkSpace = 'create';
      this.environmentService.setPOCId('null');
    }
  }
}
