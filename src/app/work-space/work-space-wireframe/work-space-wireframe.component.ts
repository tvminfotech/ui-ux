import { Component, OnInit } from '@angular/core';
import { WorkSpaceWireframeService } from './work-space-wireframe.service';
import { first } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../utils/common.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { EditCommentsReceivedComponent } from '../edit-comments-received/edit-comments-received.component';
@Component({
  selector: 'app-work-space-wireframe',
  templateUrl: './work-space-wireframe.component.html',
  styleUrls: ['./work-space-wireframe.component.css']
})
export class WorkSpaceWireframeComponent implements OnInit {
  editCommentsDialogPtr: DynamicDialogRef;
  reviewers = [];
  selectedRole: any;
  reviewer: object;
  selectedReviewer = [];
  existingReviewer = [];
  commentsReceived = [];
  selectedReviewerObj = {};
  selectedReviewerIndex: any;
  tableContent = [];
  status = [];
  iframeUrl: any;
  link: any;
  boardId: any;
  wsPocId: any;
  respAfterSavingLink: object;
  canShowReviewer: boolean = false;
  canShowIframe: boolean;
  constructor(private workspace: WorkSpaceWireframeService,
    private sanitizer: DomSanitizer,
    private actRoute: ActivatedRoute,
    private commonService: CommonService,
    private dialogService: DialogService) { }


  getParams() {
    this.actRoute.parent.paramMap
      .subscribe(params => {
        this.boardId = params['params'].boardId;
        this.wsPocId = params['params'].subNav
      });
  }

  variablesSetting(data) {
    this.canShowReviewer = true;
    this.canShowIframe = true;
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
    this.respAfterSavingLink = data;
    this.status = data;
  }

  loadIframe() {
    const reqdata = {
      "micrositeId": this.workspace.micrositeId, "pocId": this.wsPocId, "pocBoardMapId": this.boardId
    }
    this.workspace.getLinkDetails(reqdata)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_data && Object.keys(data.result_data).length !== 0) {
            this.link = data.result_data[0]['docLink'];
            this.variablesSetting(data.result_data);
            return;
          }
        },
        error => {
        });
  }

  onSaveLink() {
    const reqdata = {
      "docLink": this.link, "micrositeId": this.workspace.micrositeId, "pocId": this.wsPocId, "pocBoardMapId": this.boardId
    }
    this.workspace.onSaveLink(reqdata)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_data && Object.keys(data.result_data).length !== 0) {
            this.variablesSetting(data.result_data);
            return;
          }
        },
        error => {
        });
  }

  ngOnInit(): void {
    this.getParams();
    this.proto();
    this.loadIframe();
  }

  proto() {
    this.reviewers = [
      { "id": 3, "name": "Reviewer 3" },
      { "id": 4, "name": "Reviewer 4" },
    ]
    this.existingReviewer = [
      { "id": 1, "name": "Reviewer 1" },
      { "id": 2, "name": "Reviewer 2" },
    ]
    this.commentsReceived = [
      { "date": "Dec 25, 2020", "reviewer": "Rajiv", "comments": "Check Section 4", "action": "Accepted", "assignTo": "Developer 1", "status": "Inprogress" },
      { "date": "Dec 25, 2020", "reviewer": "Kali", "comments": "Reduce no of steps", "action": "Rejected", "assignTo": "", "status": "Done" },
      { "date": "Dec 25, 2020", "reviewer": "Reviewer 1", "comments": "Notification to be added", "action": "Accepted", "assignTo": "Developer 2", "status": "Inprogress" },
      { "date": "Dec 25, 2020", "reviewer": "Reviewer 2", "comments": "FAQ missing", "action": "Rejected", "assignTo": "", "status": "Done" }
    ];
  }
  selectReviewer() {
    if (this.selectedRole != null && this.selectedRole != undefined) {
      this.selectedReviewer.push(this.selectedReviewerObj);
      this.reviewers.splice(this.selectedReviewerIndex, 1);
    }
    else {
      this.commonService.failureMessage("Please select reviewer");
    }
    this.selectedRole = null;
  }
  onChangeReview(event) {
    this.selectedReviewerObj = {};
    this.selectedReviewerIndex = null;
    this.selectedReviewerIndex = event.target["selectedIndex"];
    var element = this.reviewers[this.selectedReviewerIndex];
    this.selectedReviewerObj = element;
  }
  deleteSelectedReviewer(item, index) {
    this.reviewers.push(item);
    this.selectedReviewer.splice(index, 1);
  }
  editComments(item) {
    this.editCommentsDialogPtr = this.dialogService.open(EditCommentsReceivedComponent, {
      //header: 'Setup your account',
      showHeader: false,
      closable: false,
      width: '35%',
      data: item,
      contentStyle: { "max-height": "30%", "overflow": "auto", "padding": "0 1.1rem 0rem 1.5rem", "border-radius": "10px" },
    });
  }

}
