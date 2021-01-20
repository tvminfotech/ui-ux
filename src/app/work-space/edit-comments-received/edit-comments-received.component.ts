import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CommonService} from '../../utils/common.service';

@Component({
  selector: 'app-edit-comments-received',
  templateUrl: './edit-comments-received.component.html',
  styleUrls: ['./edit-comments-received.component.css']
})
export class EditCommentsReceivedComponent implements OnInit {
  assignToModel:any=null;
  statusModel:any=null;
  formGroup: FormGroup;
  data:any;
  constructor(private commonService:CommonService,private dialog: DynamicDialogRef,public config: DynamicDialogConfig,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.data = this.config.data;
    this.initForm();
  }
  initForm(){
    this.formGroup = this.formBuilder.group({
      reviewer: [this.data.reviewer, Validators.required],
      comments: [this.data.comments, Validators.required],
      assignTo: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
  Close() {
    this.dialog.close()
  }
}
