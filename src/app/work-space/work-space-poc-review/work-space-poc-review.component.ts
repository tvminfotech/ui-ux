import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import {EditCommentsReceivedComponent} from '../edit-comments-received/edit-comments-received.component';
import {WorkSpacePocReviewService} from './work-space-poc-review.service';
import {CommonService} from '../../utils/common.service';
@Component({
  selector: 'app-work-space-poc-review',
  templateUrl: './work-space-poc-review.component.html',
  styleUrls: ['./work-space-poc-review.component.css']
})
export class WorkSpacePocReviewComponent implements OnInit {
  editCommentsDialogPtr: DynamicDialogRef;
  commentsReceived=[];
  reviewerList:[];
  header:any;
  micrositeId:any;
  wsPocId:any;
  totalCount:any=0;
  openCount:any=0;
  closedCount:any=0;
  constructor(private dialogService: DialogService,
             private workspace:WorkSpacePocReviewService,
             private actRoute: ActivatedRoute,
             private commonService:CommonService
             ) { }

  ngOnInit(): void {
    this.getParams();
    this.getReviewer();
    this.getReviewComments();
    this.getDashboard();
  }
  initForm()
  {
  this.proto();
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
        this.wsPocId = params['params'].subNav
      });
  }
  proto()
  {
    this.commentsReceived=[
      {"phase":"Process Flow","date":"Dec 25, 2020","reviewer":"Rajiv","comments":"Check Section 4","action":"Accepted","assignTo":"Developer 1","status":"Inprogress"},
      {"phase":"Process Flow","date":"Dec 25, 2020","reviewer":"Kali","comments":"Reduce no of steps","action":"Rejected","assignTo":"","status":"Done"},
      {"phase":"Application Flow","date":"Dec 25, 2020","reviewer":"Reviewer 1","comments":"Notification to be added","action":"Accepted","assignTo":"Developer 2","status":"Inprogress"},
      {"phase":"Prototype","date":"Dec 25, 2020","reviewer":"Reviewer 2","comments":"FAQ missing","action":"Rejected","assignTo":"","status":"Done"}
    ];
  }
  getReviewer()
  {
    const reqdata = {
      "micrositeId": parseInt(this.micrositeId),
      "workspaceId": parseInt(this.wsPocId)
    }
    this.workspace.getReviewer(reqdata, this.header)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_status.toUpperCase() == "SUCCESS") {
            this.reviewerList = data.result_data;
            return;
          }
        },
        error => {
        });
  }
  getReviewComments()
  {
    const reqdata = {
      "micrositeId": parseInt(this.micrositeId),
      "workspaceId": parseInt(this.wsPocId)
    }
    this.workspace.getReviewComments(reqdata, this.header)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_status.toUpperCase() == "SUCCESS") {
            this.commentsReceived = data.result_data;
            return;
          }
        },
        error => {
        });
  }
  getDashboard()
  {
    const reqdata = {
      "micrositeId": parseInt(this.micrositeId),
      "workspaceId": parseInt(this.wsPocId)
    }
    this.workspace.getDashboard(reqdata, this.header)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_status.toUpperCase() == "SUCCESS") {
            //this.commentsReceived = data.result_data;

            this.totalCount =data.result_data.reviewTotalCount;
            this.openCount =data.result_data.reviewOpenCount;
            this.closedCount=data.result_data.reviewClosedCount;
            return;
          }
        },
        error => {
        });
  }
  editComments(item)
  {
    item["wsPocId"]=this.wsPocId;
	  item["boardId"]=item.workspaceDtlId;
    this.editCommentsDialogPtr = this.dialogService.open(EditCommentsReceivedComponent, {
      //header: 'Setup your account',
      showHeader: false,
      closable: false,
      width: '35%',
      data: item,
      contentStyle: { "max-height": "30%", "overflow": "auto", "padding": "0 1.1rem 0rem 1.5rem", "border-radius": "10px" },
    });
    this.editCommentsDialogPtr.onClose.subscribe((data) => {
      this.getReviewer();
      this.getReviewComments();
      this.getDashboard();
    });
  }
}
