import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import {WorkSpaceAddEstimationDetailsComponent} from '../work-space-add-estimation-details/work-space-add-estimation-details.component';
import {WorkSpaceEditEstimationDetailsComponent} from '../work-space-edit-estimation-details/work-space-edit-estimation-details.component';
import {WorkSpaceFinancialsService} from './work-space-financials.service';
import {CommonService} from '../../utils/common.service';

@Component({
  selector: 'app-work-space-financials',
  templateUrl: './work-space-financials.component.html',
  styleUrls: ['./work-space-financials.component.css']
})
export class WorkSpaceFinancialsComponent implements OnInit {
  formGroup: FormGroup;
  fileSelect: FileList;
  blob: any;
  fileId:any;
  fileName:any;
  isUploadFlag:boolean=false;
  myEstimationFlag:boolean=false;
  hivezenEstimation:boolean=true;
  hivezenPhaseDtl:any;
  addEstimationDialogPtr: DynamicDialogRef;
  editEstimationDialogPtr: DynamicDialogRef;
  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };
  wsPocId: string;
  micrositeId: string;
  constructor(private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private workspace:WorkSpaceFinancialsService,
    private commonService:CommonService) { }

  ngOnInit(): void {
    this.initForm();
    this.getParams();
    this.getEstimationHeaderInfo();
  }
  initForm()
  {
    this.formGroup = this.formBuilder.group({
      uploadFile: ['']
    });
  }
  getParams() {
    this.actRoute.parent.paramMap
      .subscribe(params => {
        this.wsPocId = params['params'].subNav;
      });
    this.micrositeId = JSON.parse(localStorage.getItem('micrositeId'));
  }
  getEstimationHeaderInfo()
  {
    const reqdata = {
      "micrositeId": parseInt(this.micrositeId),
      "workspaceId": parseInt(this.wsPocId)
    }
    this.workspace.getEstimationHeaderInfo(reqdata, this.header)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_status.toUpperCase() == "SUCCESS" && data.result_data !=null) {
            this.fileId=data['result_data'][0].id;
            this.fileName =data['result_data'][0].fileName;
            var estimationType =data['result_data'][0].estimationType;            
            if (estimationType == 'myEstimation')
            {
              this.isUploadFlag=true;
              this.myEstimationFlag=true;
              this.hivezenEstimation=false;
            }
            else
            {
              this.isUploadFlag=false;
              this.myEstimationFlag=false;
              this.hivezenEstimation=true;
              this.getEstimationDetailInfo();
            }
            return;
          }
        },
        error => {
        });
  }
  getEstimationDetailInfo()
  {
    const reqdata = {
      "micrositeId": parseInt(this.micrositeId),
      "workspaceId": parseInt(this.wsPocId)
    }
    this.workspace.getEstimationDetailInfo(reqdata, this.header)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_status.toUpperCase() == "SUCCESS" && data.result_data !=null) {
            
            this.hivezenPhaseDtl = data.result_data.estimationDetails;
            return;
          }
        },
        error => {
        });
  }
 
  fileUpload(file: FileList) {
    this.fileSelect = file;
  }
  upload()
  {
    const formData = this.formGroup.getRawValue();
    const reqdata = {
      "description": formData.docDesc,
      "micrositeId": parseInt(this.micrositeId),
      "workspaceId": parseInt(this.wsPocId),
      "estimationType": "myEstimation"
    }
    var isEdit=false;
    if (this.isUploadFlag && this.fileId !=null)
    {
      reqdata["id"]=this.fileId;
      isEdit=true;
    }
    if (this.fileSelect == undefined)
    {
      this.commonService.failureMessage("Upload document");
      return;
    }
    const fileToUpload = this.fileSelect.item(0);    
    const formDataf = new FormData();
    formDataf.append('file', fileToUpload, fileToUpload.name);
    formDataf.append('docDto', JSON.stringify(reqdata));
    console.log(fileToUpload,">>>>>>>>>>>>>fileToUpload");
    this.workspace.upload(formDataf,this.header,isEdit)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_status === 'Success') {
            this.commonService.successMessage(data.result_msg);
            this.fileId=data.result_data.id;
            this.fileName =data.result_data.fileName;
          }
          else
          {
            this.commonService.failureMessage(data.result_msg);
          }
        },
        error => {
        });
  }
  download()
  {
    if (this.fileId ==undefined || this.fileId ==null)
    {
      this.commonService.failureMessage("No file to view");
      return;
    }
    let param = new HttpParams().set("docDto", `{"micrositeId": ${this.micrositeId},"workspaceId":${this.wsPocId},"id":${this.fileId}}`);
    this.workspace.download(param,this.header)
      .pipe(first())
      .subscribe(
        (data: any) => {
          var ext = this.fileName.substr(this.fileName.lastIndexOf('.') + 1);
          this.blob = new Blob([data], { type: ext });           
          var downloadURL = window.URL.createObjectURL(this.blob);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = this.fileName;
          link.click();
        },
        error => {
        });
  }
  radioClick(val)
  {
    if(val == 'Upload')
    {
      this.isUploadFlag=true;
    }
    else{
      this.isUploadFlag=false;
    }
  }
  addEstimation()
  {
    var objPubSub = {
      "micrositeId": this.micrositeId,
      "workspaceId": this.wsPocId,
      "estimationType": "hivezenEstimation"
    };
    this.addEstimationDialogPtr = this.dialogService.open(WorkSpaceAddEstimationDetailsComponent, {
      //header: 'Setup your account',
      showHeader:false,
      closable:false,
      width: '30%', 
      data:objPubSub,
      contentStyle: { "max-height": "30%", "overflow": "auto","padding":"0 1.1rem 0rem 1.5rem","border-radius":"10px"},
    });

    this.addEstimationDialogPtr.onClose.subscribe((data) => {
      this.getEstimationHeaderInfo();
      this.getEstimationDetailInfo();
    });
  }
  editEstimation(hivezenPhaseDtlobj)
  {
    var objPubSub = {
      "micrositeId": this.micrositeId,
      "workspaceId": this.wsPocId,
      "estimationType": "hivezenEstimation",
      "id": hivezenPhaseDtlobj.id,
      "estimationId":hivezenPhaseDtlobj.estimationId,
      "devPhase":hivezenPhaseDtlobj.devPhase,
      "manMonthsEffort" : hivezenPhaseDtlobj.manMonthsEffort,
      "costs":hivezenPhaseDtlobj.costs
    };
    this.addEstimationDialogPtr = this.dialogService.open(WorkSpaceEditEstimationDetailsComponent, {
      //header: 'Setup your account',
      showHeader:false,
      closable:false,
      width: '30%',
      data:objPubSub,
      contentStyle: { "max-height": "30%", "overflow": "auto","padding":"0 1.1rem 0rem 1.5rem","border-radius":"10px"},
    }); 
    this.addEstimationDialogPtr.onClose.subscribe((data) => {
      this.getEstimationDetailInfo();
    });
  }

}
