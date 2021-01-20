import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import {ExpandYourTeamComponent} from '../expand-your-team/expand-your-team.component';

@Component({
  selector: 'app-manage-subscription',
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.css']
})
export class ManageSubscriptionComponent implements OnInit {
  inviteMemberDialogPtr: DynamicDialogRef;
  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
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
  }
}
