import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {WorkSpaceEditEstimationDetailsService} from './work-space-edit-estimation-details.service';
import {CommonService} from '../../utils/common.service';
import { first } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-work-space-edit-estimation-details',
  templateUrl: './work-space-edit-estimation-details.component.html',
  styleUrls: ['./work-space-edit-estimation-details.component.css']
})
export class WorkSpaceEditEstimationDetailsComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  micrositeId:any;
  workspaceId:any;
  estimationType:any;
  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };
  constructor(public dialog: DynamicDialogRef,public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private workspace:WorkSpaceEditEstimationDetailsService,
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
    var data = this.config.data;
    this.micrositeId= parseInt(data.micrositeId);
    this.workspaceId=parseInt(data.workspaceId);
    this.estimationType= data.estimationType;
    this.formGroup.patchValue(data)
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
    
    const formData = this.formGroup.getRawValue();
    const estimationDetails=[
      {
       "devPhase":formData.devPhase,
       "manMonthsEffort" : formData.manMonthsEffort,
       "costs":formData.costs
      }]
      var data = this.config.data;
    const reqdata = {
      "id":data.id,
      "micrositeId": this.micrositeId,
      "workspaceId": this.workspaceId,
      "estimationId":data.estimationId,
      "estimationType": this.estimationType,
      "devPhase":formData.devPhase,
      "manMonthsEffort" : formData.manMonthsEffort,
      "costs":formData.costs
    }
    var isEditFlag =true;
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
