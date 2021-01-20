import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef ,DynamicDialogConfig} from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {WorkSpaceUploadImageService} from './work-space-upload-image.service';
import { first } from 'rxjs/operators';
import {CommonService} from '../../utils/common.service';

@Component({
  selector: 'app-work-space-upload-image',
  templateUrl: './work-space-upload-image.component.html',
  styleUrls: ['./work-space-upload-image.component.css']
})
export class WorkSpaceUploadImageComponent implements OnInit {
  isEditFlag:boolean=false;
  submitted: boolean = false;
  formGroup: FormGroup;
  fileSelect: FileList;
  selectedDocuments:any;
  documentList:any;
  docId:any;
  docName:any;
  constructor(public dialog: DynamicDialogRef,private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,private service:WorkSpaceUploadImageService,
    private commonService:CommonService) {
    
   }

  ngOnInit(): void {
    this.initForm();
    this.getDocuments();
  }
  initForm()
  {
    this.formGroup = this.formBuilder.group({
      docName: ['', Validators.required],
      uploadFile: ['', Validators.required],
      docDesc: ['', Validators.required]
    });
  }
  getDocuments()
  {
    var data = this.config.data;
    const req_data = {
      'micrositeId': data.micrositeId,
      'pocId': data.pocId,
      'pocBoardMapId': data.pocBoardMapId
    }
    this.service.getDocuments(req_data)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if ( data.result_data !=null && data.result_data.length) {     
            this.documentList= data.result_data;
            return;
          }
        },
        error => {
        });

  }
  get f1() { return this.formGroup.controls; }
  fileUpload(file: FileList) {
    this.fileSelect = file;
  }
  Save()
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formGroup.invalid) {
     return;
    }
    
    var data = this.config.data;
    const formData = this.formGroup.getRawValue();
    
    const reqdata = {
      "docDesc": formData.docDesc,
      //"docName": formData.docName,
      "micrositeId": parseInt(data.micrositeId),
      "pocId": parseInt(data.pocId), 
      "pocBoardMapId": parseInt(data.pocBoardMapId)
    }
    if (this.isEditFlag)
    {
      reqdata["docName"]=this.docName;
      reqdata["id"]=parseInt(this.docId);      
    }
    else
    {
      reqdata["docName"]=formData.docName;
    }
    const fileToUpload = this.fileSelect.item(0);
    const formDataf = new FormData();
    formDataf.append('file', fileToUpload, fileToUpload.name);
    formDataf.append('docDto', JSON.stringify(reqdata));

    
    this.service.onUpload(formDataf,this.isEditFlag)
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
  Close() {
    this.dialog.close()
  }
  handleClick(val)
  {
    if(val == 'Edit')
    {
      this.isEditFlag=true;
    }
    else{
      this.isEditFlag=false;
    }
    this.formGroup.get("docName").setValue(null);
    this.formGroup.get("docDesc").setValue(null);
    this.selectedDocuments =null;
    this.docId="";
    this.docName="";
  }
  onChange(val,event)
  {
    var selectedIndex= event.target["selectedIndex"];
    var element =this.documentList[selectedIndex];
    this.formGroup.get("docDesc").setValue(element.description);
    this.docId = val;
    this.docName = element.docName;
  }
}
