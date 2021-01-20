import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { SignUpEmailComponent} from '../sign-up-email/sign-up-email.component';
import {CommonService} from '../../utils/common.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'], 
    encapsulation: ViewEncapsulation.None, 
})
export class LoginComponent implements OnInit {
    signupDialogPtr: DynamicDialogRef;
    loginForm: FormGroup;
    submitted: boolean = false;
    isLoginError: boolean = false;
    loginFormDiv: boolean = true;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService,
        private dialogService: DialogService,
        private commonService:CommonService) { }

    getLoginDetails(token: any) {
        const formData = {};
        const header = {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${token}`)
        };
        this.loginService.getLoggedInDetails(header)
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.setItem('tempCurrentUser', JSON.stringify(data['result_data']));
                    localStorage.setItem('micrositeId',data['result_data'].micrositeDto.id);
                    this.getWorkSpace(localStorage.getItem("tempCurrentUserToken"));
                    // data.result_data
                    return;
                },
                error => {
                });
    }

    onSubmit() {
        this.submitted = true;
        this.isLoginError = false;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        else {
            const formData = this.loginForm.getRawValue();
            const reqdata = {
                "emailId": formData.emailId,
                "password": formData.password,
                "rememberMe": true
            }
            this.loginService.login(reqdata)
                .pipe(first())
                .subscribe(
                    data => {
                        if (data.result_status === 'SUCCESS') {
                            localStorage.setItem('tempCurrentUserToken', data.result_data.id_token);
                            this.getLoginDetails(data.result_data.id_token);
                            //this.getWorkSpace(data.result_data.id_token);
                            return;
                        }
                        else
                        {
                            this.commonService.failureMessage("Incorrect email or password");
                        }
                    },
                    error => {
                    });
        }
    }

    getWorkSpace(token: any) {
        const header = {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${token}`)
        };
        this.loginService.getWorkSpaceboards(header)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    const len = data ? data.result_data.length : [];
                    //len ? this.router.navigate(['/workspace/createworkspace']) : this.router.navigate(['/workspace/createworkspace'])
                    len ? this.router.navigate(['/workspace']) : this.router.navigate(['/workspace'])
                    return;
                },
                error => {
                });
    }

    get f1() { return this.loginForm.controls; }

    // Form Initialize
    initForm() {
        this.loginForm = this.formBuilder.group({
            emailId: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.initForm();
        this.deleteLocalStorage();
        //console.log(localStorage,"login init")
    }
    signup()
    {
        this.signupDialogPtr = this.dialogService.open(SignUpEmailComponent, {
            //header: 'Setup your account',
            showHeader:false,
            closable:false,
            width: '59%',
            contentStyle: { "max-height": "30%", "overflow": "auto","padding":"0 1.1rem 0rem 1.5rem","border-radius":"10px"},
          });
    }
    deleteLocalStorage()
    {
        Object.keys(localStorage).forEach(function(key){
            localStorage.removeItem(key);
         });
    }
    
}