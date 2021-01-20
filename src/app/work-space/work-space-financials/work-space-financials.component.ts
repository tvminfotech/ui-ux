import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import {WorkSpaceAddEstimationDetailsComponent} from '../work-space-add-estimation-details/work-space-add-estimation-details.component';
import {WorkSpaceEditEstimationDetailsComponent} from '../work-space-edit-estimation-details/work-space-edit-estimation-details.component';

@Component({
  selector: 'app-work-space-financials',
  templateUrl: './work-space-financials.component.html',
  styleUrls: ['./work-space-financials.component.css']
})
export class WorkSpaceFinancialsComponent implements OnInit {
  isUploadFlag:boolean=false;
  addEstimationDialogPtr: DynamicDialogRef;
  editEstimationDialogPtr: DynamicDialogRef;
  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
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
    this.addEstimationDialogPtr = this.dialogService.open(WorkSpaceAddEstimationDetailsComponent, {
      //header: 'Setup your account',
      showHeader:false,
      closable:false,
      width: '30%',
      contentStyle: { "max-height": "30%", "overflow": "auto","padding":"0 1.1rem 0rem 1.5rem","border-radius":"10px"},
    });
  }
  editEstimation()
  {
    this.addEstimationDialogPtr = this.dialogService.open(WorkSpaceEditEstimationDetailsComponent, {
      //header: 'Setup your account',
      showHeader:false,
      closable:false,
      width: '30%',
      contentStyle: { "max-height": "30%", "overflow": "auto","padding":"0 1.1rem 0rem 1.5rem","border-radius":"10px"},
    }); 
  }

}
