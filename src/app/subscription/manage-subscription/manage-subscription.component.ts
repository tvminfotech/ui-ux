import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import {ExpandYourTeamComponent} from '../expand-your-team/expand-your-team.component';
import { first } from 'rxjs/operators';
import { SubcriptionService } from '../subcription.service';
import { CommonService } from '@app/utils/common.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manage-subscription',
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.css']
})
export class ManageSubscriptionComponent implements OnInit {
  inviteMemberDialogPtr: DynamicDialogRef;
  membersList = [];
  micrositeId = localStorage.getItem('micrositeId');
  token = localStorage.getItem('tempCurrentUserToken');
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
  };
  
  constructor(private dialogService: DialogService,
    private service: SubcriptionService,
    private common: CommonService) { }

  ngOnInit(): void {
    this.getAllMem(this.micrositeId);
  }

  getAllMem(micrositeId){
    this.service.getAllMem(micrositeId, this.header)
      .pipe(first())
      .subscribe(
        (data: any) => {
          // if (data.result_data && Object.keys(data.result_data).length !== 0) {
          if (data.result_status.toUpperCase() === "SUCCESS") {
            this.membersList = data.result_data;
            return;
          }
        },
        error => {
        });
  }
  inviteMember()
  {
    this.inviteMemberDialogPtr = this.dialogService.open(ExpandYourTeamComponent, {
      //header: 'Setup your account',
      showHeader:false,
      closable:false,
      width: '59%',
      contentStyle: { "max-height": "30%", "overflow": "auto","padding":"0 1.1rem 0rem 1.5rem","border-radius":"10px"},
    });

    this.inviteMemberDialogPtr.onClose.subscribe((data) => {
      this.getAllMem(this.micrositeId);
    });

  }
}
