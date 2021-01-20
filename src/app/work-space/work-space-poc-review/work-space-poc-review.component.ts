import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import {EditCommentsReceivedComponent} from '../edit-comments-received/edit-comments-received.component';

@Component({
  selector: 'app-work-space-poc-review',
  templateUrl: './work-space-poc-review.component.html',
  styleUrls: ['./work-space-poc-review.component.css']
})
export class WorkSpacePocReviewComponent implements OnInit {
  editCommentsDialogPtr: DynamicDialogRef;
  commentsReceived=[];
  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm()
  {
  this.proto();
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
  editComments(item)
  {
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
