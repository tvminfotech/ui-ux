import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import { SignUpSucessComponent } from '../sign-up-sucess/sign-up-sucess.component';
import { SignUpInviteTeamService } from './sign-up-invite-team.service';
import { CommonService } from '../../utils/common.service';
import {AppConfigService} from '../../utils/app-config.service';

@Component({
  selector: 'app-sign-up-invite-team',
  templateUrl: './sign-up-invite-team.component.html',
  styles: []
})
export class SignUpInviteTeamComponent implements OnInit {
  signupDialogPtr: DynamicDialogRef;
  micrositeName: any;
  constructor(private appConfig: AppConfigService, public dialog: DynamicDialogRef, private dialogService: DialogService, public config: DynamicDialogConfig,
    private service: SignUpInviteTeamService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.micrositeName = this.config.data.micrositeName;
  }
  Close() {
    this.dialog.close()
  }
  later() {
    this.Success();
  }
  Invite() {
    this.Success();
  }
  Success() {
    this.Close();
    this.signupDialogPtr = this.dialogService.open(SignUpSucessComponent, {
      showHeader: false,
      closable: false,
      width: '50%',
      contentStyle: { "max-height": "30%", "overflow": "auto", "padding": "0 1.1rem 0rem 1.5rem", "border-radius": "10px" },
    });
    const baseUrlFlag = this.appConfig.appConfig['flag'];
    if (baseUrlFlag == 'Y') {
      window.location.href = "http://" + this.micrositeName + ".hivezen.com:9797/Hivezen/";
    }
  }
  successMessage(msg) {
    this.commonService.successMessage(msg);
  }
  failureMessage(msg) {
    this.commonService.failureMessage(msg);
  }
}
