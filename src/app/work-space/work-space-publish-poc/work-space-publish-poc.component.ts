import { Component, OnInit } from '@angular/core';
import { WorkSpaceWireframeService } from '../work-space-wireframe/work-space-wireframe.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-work-space-publish-poc',
  templateUrl: './work-space-publish-poc.component.html',
  styleUrls: ['./work-space-publish-poc.component.css']
})
export class WorkSpacePublishPocComponent implements OnInit {
  boardId: any;
  wsPocId: any;
  micrositeId:any;
  iframeUrl: any;
  header:any;
  constructor(private workspace: WorkSpaceWireframeService,
    private sanitizer: DomSanitizer,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();
    this.loadIframe();
  }

  getParams() {
    const token = localStorage.getItem('tempCurrentUserToken');
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    };
    this.micrositeId =localStorage.getItem('micrositeId');
    this.actRoute.parent.paramMap
      .subscribe(params => {
        this.boardId = params['params'].boardId;
        this.wsPocId = params['params'].subNav
      });
  }

  loadIframe() {
    const reqdata = {
      "micrositeId": this.micrositeId, "pocId": this.wsPocId, "pocBoardMapId": this.boardId
    }
    this.workspace.getLinkDetails(reqdata,this.header)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_status.toUpperCase() == "SUCCESS") {
            this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.result_data[0]['docLink']);
            return;
          }
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("assets/images/noData.png");
        },
        error => {
        });
  }

}
