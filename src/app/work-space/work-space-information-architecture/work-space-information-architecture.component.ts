import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { WorkSpaceInformationArchitectureService } from './work-space-information-architecture.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:import-spacing
import  * as $ from 'src/assets/js/jquery.min.js';
import {CommonService} from '../../utils/common.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { WorkSpaceUploadImageComponent} from '../work-space-upload-image/work-space-upload-image.component';
import {EditCommentsReceivedComponent} from '../edit-comments-received/edit-comments-received.component';
declare var jQuery:any;

@Component({
  selector: 'app-work-space-information-architecture',
  templateUrl: './work-space-information-architecture.component.html',
  styleUrls: ['./work-space-information-architecture.component.css']
})
export class WorkSpaceInformationArchitectureComponent implements OnInit {
  uploadDialogPtr: DynamicDialogRef;
  editCommentsDialogPtr: DynamicDialogRef;
  roles = [];
  reviewers = [];
  selectedRole: any;
  reviewerList: any;
  reviewer: object;
  selectedReviewer = [];
  selectedReviewerObj={};
  selectedReviewerIndex:any;
  existingReviewer=[];
  commentsReceived=[];
  allUploadedFile = [];
  allUploadedFileIndex = [];
  IX = 0;
  pageIconCount: number = 1;
  allUploadedFileCount = 0;
  allFiles = [];
  tableContent = [];
  status = [];
  imageURL: any;
  formGroup: FormGroup;
  fileSelect: FileList;
  blob: any;
  submitted: boolean = false;
  desc: string;
  heading: string;
  activeCorosalImg: object;
  boardId: any; 
  wsPocId: any;
  micrositeId: any;
  currentIndex:any =-1;
  constructor(private workspace: WorkSpaceInformationArchitectureService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private commonService:CommonService,
    private dialogService: DialogService) { }

    //Getting all the uploaded files list
  getAllUploadedFile() {
    this.allFiles = [];
    this.allUploadedFileIndex = [];
    this.pageIconCount = 1;

    const id = {
      'micrositeId': this.workspace.micrositeId,
      'pocId': this.wsPocId,
      'pocBoardMapId': this.boardId //process flow board id
    }
    this.workspace.getAllUploadedFile(id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_data !=null && data.result_data.length) {
            this.allUploadedFile = data.result_data;
            this.getCarouselImage();
            return;
          }
        },
        error => {
        });
  }

  getCarouselImage()
  {
    var allFiles =[];    
    this.desc = this.allUploadedFile[0].description;
    this.heading = this.allUploadedFile[0].docName ? this.commonService.sliceEXTFromName(this.allUploadedFile[0].docName) : null;

    this.allUploadedFileCount = 0;
    var allFilesObj ={};
    this.allUploadedFile.forEach(element => {      
      allFilesObj ={};
    if (this.allUploadedFileCount == 0)
    {
      allFilesObj["active"] =true;
    }
    allFilesObj["docName"] =element.docName;
    
    allFiles.push(allFilesObj);
    this.getImageUrl(element,allFilesObj,allFiles);
    if (this.allUploadedFileCount % this.pageIconCount == 0) {
      this.allUploadedFileIndex.push(this.allUploadedFileCount / this.pageIconCount);
    }
    this.allUploadedFileCount++;
    });
    var allFilesArray =[]; 
    allFiles.forEach(element => { 
      allFilesArray.push(element);
    });
    this.allFiles =[];
    this.allFiles =allFilesArray.slice();
  }
  
  onClickSlider(item,ix) { 
    var allFiles = this.allFiles;
    var response_date = [];
    var cnt=0;
    allFiles.forEach(function(item) { 
    var tempItem = Object.assign({}, item);
    delete tempItem.active;           
    if (cnt == ix)
    {
      tempItem["active"]=true;
    }
    response_date.push(tempItem);
    cnt = cnt +1;
      });
    this.allFiles =[];
    this.allFiles =response_date.slice();
    this.desc = item.description;
    this.heading = this.commonService.sliceEXTFromName(item.docName) ;
    this.allFiles.slice(0);
    this.IX =ix;
  }

  getImageUrl(item,allFilesObj,allFiles) {
    var micrositeId =localStorage.getItem("micrositeId");
    let param = new HttpParams().set("docDto", `{"docName": "${item.docName}","micrositeId": ${micrositeId},"pocId":${this.wsPocId},"pocBoardMapId":${this.boardId},"id":${item.docId}}`);
     this.workspace.onDownloadFile(param)
       .pipe(first())
       .subscribe(
         (data: any) => {    
           this.activeCorosalImg = item;
           this.blob = new Blob([data], { type: 'image/png' });
           allFilesObj["imageUrl"] =window.URL.createObjectURL(data);
           allFiles.push(allFilesObj)
           return;
         },
         error => {
         });
   }
   getSantizeUrl(url : string) {
       
         return this.sanitizer.bypassSecurityTrustUrl(url);
     }
  initForm() {
    this.formGroup = this.formBuilder.group({
      uploadFile: ['', Validators.required],
      documentDescription: ['', Validators.required]
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

  ngOnInit(): void {
    this.getParams();
    this.initForm();
    this.getAllUploadedFile();
    this.selectedReviewer = [];
    this.proto() ;
  }
  ClickCarousolLeftSlider()
  {
    var currentItem = jQuery("#myCarousel .item.active" );    
    var currentIndex = jQuery('#myCarousel .item').index(currentItem) -1;
    var cnt = this.allUploadedFile.length;
    if (currentIndex < 0)
    {
      currentIndex = cnt-1;
    }
    console.log(currentIndex,this.allUploadedFile[currentIndex],">>>>>>left");
    this.desc = this.allUploadedFile[currentIndex].description;
    this.heading = this.allUploadedFile[currentIndex].docName ? this.commonService.sliceEXTFromName(this.allUploadedFile[currentIndex].docName) : null;
  }
  ClickCarousolRightSlider()
  {
    var currentItem = jQuery("#myCarousel .item.active" );    
    var currentIndex = jQuery('#myCarousel .item').index(currentItem) +1;
    var cnt = this.allUploadedFile.length;
    if (currentIndex == cnt)
    {
      currentIndex = 0;
    }
    console.log(currentIndex,this.allUploadedFile[currentIndex],">>>>>>right");
    this.desc = this.allUploadedFile[currentIndex].description;
    this.heading = this.allUploadedFile[currentIndex].docName ? this.commonService.sliceEXTFromName(this.allUploadedFile[currentIndex].docName) : null;  
  }
  upload()
    {
      var objPubSub = {
        "micrositeId":this.workspace.micrositeId,
        "pocId":this.wsPocId,
        "pocBoardMapId":this.boardId        
      };

      this.uploadDialogPtr = this.dialogService.open(WorkSpaceUploadImageComponent, {
          //header: 'Setup your account',
          showHeader:false,
          closable:false,
          width: '59%',
          data:objPubSub,
          contentStyle: { "max-height": "30%", "overflow": "auto","padding":"0 1.1rem 0rem 1.5rem","border-radius":"10px"},
        });
        this.uploadDialogPtr.onClose.subscribe((data) => {
          this.getAllUploadedFile();
        });
    }
    
  proto() {
    this.reviewers = [
      { "id": 3, "name": "Reviewer 3" },
      { "id": 4, "name": "Reviewer 4" },
    ]
    this.existingReviewer=[
      { "id": 1, "name": "Reviewer 1" },
      { "id": 2, "name": "Reviewer 2" },
    ]
    this.commentsReceived=[
      {"date":"Dec 25, 2020","reviewer":"Rajiv","comments":"Check Section 4","action":"Accepted","assignTo":"Developer 1","status":"Inprogress"},
      {"date":"Dec 25, 2020","reviewer":"Kali","comments":"Reduce no of steps","action":"Rejected","assignTo":"","status":"Done"},
      {"date":"Dec 25, 2020","reviewer":"Reviewer 1","comments":"Notification to be added","action":"Accepted","assignTo":"Developer 2","status":"Inprogress"},
      {"date":"Dec 25, 2020","reviewer":"Reviewer 2","comments":"FAQ missing","action":"Rejected","assignTo":"","status":"Done"}
    ];
  }
  selectReviewer() {
    if(this.selectedRole != null && this.selectedRole != undefined)
    {
    this.selectedReviewer.push(this.selectedReviewerObj);
    this.reviewers.splice(this.selectedReviewerIndex,1);    
    }
    else
    {
      this.commonService.failureMessage("Please select reviewer");
    }
    this.selectedRole=null;
  }
  onChangeReview(event)
  {
    this.selectedReviewerObj={};
    this.selectedReviewerIndex=null;
    this.selectedReviewerIndex= event.target["selectedIndex"];
    var element =this.reviewers[this.selectedReviewerIndex];
    this.selectedReviewerObj =element;
  }
  deleteSelectedReviewer(item,index)
  {
    this.reviewers.push(item);
    this.selectedReviewer.splice(index,1);
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
