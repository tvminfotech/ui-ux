import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import {AddInternalResourceComponent} from '../add-internal-resource/add-internal-resource.component';
import {CommonService} from '../../utils/common.service';
import {EditInternalResourceComponent} from '../edit-internal-resource/edit-internal-resource.component';
@Component({
  selector: 'app-work-space-team',
  templateUrl: './work-space-team.component.html',
  styleUrls: ['./work-space-team.component.css']
})
export class WorkSpaceTeamComponent implements OnInit {
  resourceDialogPtr: DynamicDialogRef;
  editTeamDialogPtr: DynamicDialogRef;
  teamList:any=[];
  constructor(private dialogService: DialogService,private commonService:CommonService) { }

  ngOnInit(): void {
    this.proto();
  }
  proto() {
    this.teamList=[
      { "Resource":"James", "Email": "james@123.com","Type": "Internal", "Role": "Developer", "Status": "Active" },
      { "Resource":"John", "Email": "john@123.com","Type": "Internal", "Role": "Reviewer", "Status": "Active" },
      { "Resource":"Robert", "Email": "robert@123.com","Type": "Internal", "Role": "Developer", "Status": "Active" },
      { "Resource":"Michael", "Email": "michael@123.com","Type": "Internal", "Role": "Reviewer", "Status": "Inactive" }
    ]
  }
  addResource()
  {
    this.resourceDialogPtr = this.dialogService.open(AddInternalResourceComponent, {
      //header: 'Setup your account',
      showHeader:false,
      closable:false,
      width: '30%',
      contentStyle: { "max-height": "30%", "overflow": "auto","padding":"0 1.1rem 0rem 1.5rem","border-radius":"10px"},
    });
  }
  editTeam(item)
  {
    
    this.editTeamDialogPtr = this.dialogService.open(EditInternalResourceComponent, {
      //header: 'Setup your account',
      showHeader: false,
      closable: false,
      width: '35%',
      data: item,
      contentStyle: { "max-height": "30%", "overflow": "auto", "padding": "0 1.1rem 0rem 1.5rem", "border-radius": "10px" },
    });
  }
}
