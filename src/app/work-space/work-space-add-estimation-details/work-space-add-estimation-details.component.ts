import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {WorkSpaceAddEstimationDetailsService} from './work-space-add-estimation-details.service';
import {CommonService} from '../../utils/common.service';
import { first } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-work-space-add-estimation-details',
  templateUrl: './work-space-add-estimation-details.component.html',
  styleUrls: ['./work-space-add-estimation-details.component.css']
})
export class WorkSpaceAddEstimationDetailsComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };
  constructor(public dialog: DynamicDialogRef,public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private workspace:WorkSpaceAddEstimationDetailsService,
    private commonService:CommonService) { }

  ngOnInit(): void {
    this.initForm();
  }
  get f1() { return this.formGroup.controls; }
  initForm()
  {
    this.formGroup = this.formBuilder.group({
      devPhase: ['', Validators.required],
      manMonthsEffort: ['', Validators.required],
      costs: ['', Validators.required]
    });
  }

  Close() {
    this.dialog.close()
  }
  save()
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formGroup.invalid) {
     return;
    }
    var data = this.config.data;
    const formData = this.formGroup.getRawValue();
    const estimationDetails=[
      {
        "devPhase":formData.devPhase,
       "manMonthsEffort" : formData.manMonthsEffort,
       "costs":formData.costs
      }]
    const reqdata = {
      "micrositeId": parseInt(data.micrositeId),
      "workspaceId": parseInt(data.workspaceId),
      "estimationType": data.estimationType,
      "estimationDetails":estimationDetails
    }
    var isEditFlag =false;
    this.workspace.save(reqdata,isEditFlag,this.header)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_status === 'Success') {
            this.commonService.successMessage(data.result_msg);
            this.dialog.close(data);
          }
          else
          {
            this.commonService.failureMessage(data.result_msg);
          }
        },
        error => {
        });
  }

}
