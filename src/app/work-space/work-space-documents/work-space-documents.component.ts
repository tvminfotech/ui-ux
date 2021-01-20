import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { WorkSpaceService } from './work-space-document.service';
import { CommonService } from '@app/utils/common.service';

@Component({
  selector: 'app-work-space-documents',
  templateUrl: './work-space-documents.component.html',
  styleUrls: ['./work-space-documents.component.css']
})
export class WorkSpaceDocumentsComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  fileSelect: FileList;
  workSpaceDDLists = [];
  blob: any;
  message: string;
  boardId: any;
  wsPocId: any;
  micrositeId = JSON.parse(localStorage.getItem('micrositeId'));
  constructor(
    // private WorkSpaceSevelopmentDocumentService: WorkSpaceSevelopmentDocumentService,
    private utils: CommonService,
    private HttpClient: HttpClient,
    private formBuilder: FormBuilder,
    private WorkspaceService: WorkSpaceService,
     private actRoute: ActivatedRoute) { }

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
    // console.log("");

    this.WorkspaceService.getDevelopmentDocumentationData(queryParams, header).then(
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
      "docExtn": formData.documentType,
      "docDesc": formData.documentDescription,
      "micrositeId": this.micrositeId, "pocId": this.wsPocId, "wsBoardId": this.boardId
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


    this.WorkspaceService.formDataSave(formDataf, header).pipe(first())
      .subscribe(
        (data: any) => {

          if (data['result_status'] == "Success") {
            this.submitted = false;
            this.formGroup.reset();
            this.getDocumentList();
            this.utils.successMessage(data['result_msg']);
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
    let param = new HttpParams().set("docDto", `{"docName": "${fileName}","micrositeId": ${this.micrositeId},"pocId":${this.wsPocId},"wsBoardId":${this.boardId}}`);
    this.WorkspaceService.onDownloadFile(param)
      .pipe(first())
      .subscribe(
        (data: any) => {
          var fileExt = fileName.split('.').pop();

          this.blob = new Blob([data], { type: fileExt }); // image/png

          var downloadURL = window.URL.createObjectURL(data);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = fileName;
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
