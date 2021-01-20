import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { first } from 'rxjs/operators';
import {CommonService} from '../../utils/common.service';
import { WorkSpaceSevelopmentDocumentService } from './work-space-development-document.service';

@Component({
  selector: 'app-work-space-development-document',
  templateUrl: './work-space-development-document.component.html',
  styleUrls: ['./work-space-development-document.component.css']
})
export class WorkSpaceDevelopmentDocumentComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  fileSelect: FileList;
  workSpaceDDLists = [];
  blob: any;
  message: string;
  boardId: any;
  wsPocId: any;
  micrositeId = JSON.parse(localStorage.getItem('micrositeId'));
  constructor(private WorkSpaceSevelopmentDocumentService: WorkSpaceSevelopmentDocumentService,
    private HttpClient: HttpClient,
    private formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private commonService:CommonService) { }

  ngOnInit(): void {
    this.getParams();
    this.initForm();
    this.getDocumentList();
  }

  getDocumentList() {

    const token = localStorage.getItem('tempCurrentUserToken');
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
      // .set('Content-Type', `multipart/form-data`)
    };
    let queryParams = "micrositeId=" + this.micrositeId + "&pocId=" + this.wsPocId + "&pocBoardMapId=" + this.boardId;

    // let queryParams = "micrositeId=" + this.micrositeId + "&pocId=" + this.wsPocId + "&wsBoardId=" + this.boardId;
    // console.log("");

    this.WorkSpaceSevelopmentDocumentService.getDevelopmentDocumentationData(queryParams, header).then(
      data => {
        this.workSpaceDDLists = (data['result_data'] != undefined) ? data['result_data'] : [];
      },
      error => {
      });
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      documentName: ['', Validators.required],
      documentType: ['', Validators.required],
      isFileInput: ['', Validators.required],
      uploadFile: ['', []],
      documentDescription: ['', Validators.required],
    });
  }



  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }
    const formData = this.formGroup.getRawValue();
    const reqdata = {
      "docName": formData.documentName,
      "docType": formData.documentType,
      "docDesc": formData.documentDescription,
      "micrositeId": this.micrositeId, "pocId": this.wsPocId, "pocBoardMapId": this.boardId
    }   

    const fileToUpload = this.fileSelect.item(0);
    const formDataf = new FormData();
    formDataf.append('file', fileToUpload, fileToUpload.name);
    formDataf.append('docDto', JSON.stringify(reqdata));
    const token = localStorage.getItem('tempCurrentUserToken');
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
      // .set('Content-Type', `multipart/form-data`)
    };


    this.WorkSpaceSevelopmentDocumentService.formDataSave(formDataf, header).pipe(first())
      .subscribe(
        (data: any) => {

          if (data['result_status'] == "Success") {
            this.submitted = false;
            this.formGroup.reset();
            this.getDocumentList();
            this.commonService.successMessage(data['result_msg']);
          }
        },
        error => {
        });

  }

  fileUpload(file: FileList) {
    this.fileSelect = file;
    this.formGroup.patchValue({ isFileInput: this.fileSelect ? this.fileSelect[0].name : '' });
  }


  doDownload(fileName) {
    let param = new HttpParams().set("docDto", `{"docName": "${fileName.docName}","micrositeId": ${this.micrositeId},"pocId":${this.wsPocId},"pocBoardMapId":${this.boardId}}`);
    this.WorkSpaceSevelopmentDocumentService.onDownloadFile(param)
      .pipe(first())
      .subscribe(
        (data: any) => {
          // var fileExt = fileName.split('.').pop();

          this.blob = new Blob([data], { type: fileName.fileExtn }); // image/png

          var downloadURL = window.URL.createObjectURL(this.blob);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = fileName.docName;
          link.click();
        },
        error => {
        });
  }
  get f1() { return this.formGroup.controls; }

  getParams() {
    this.actRoute.parent.paramMap
      .subscribe(params => {
        this.boardId = params['params'].boardId;
        this.wsPocId = params['params'].subNav
      });
  }

}
