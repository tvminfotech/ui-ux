import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-internal-resource',
  templateUrl: './edit-internal-resource.component.html',
  styleUrls: ['./edit-internal-resource.component.css']
})
export class EditInternalResourceComponent implements OnInit {
  roleModel :any=null;
  nameModel:any=null;
  formGroup: FormGroup;
  data:any;
  constructor(public dialog: DynamicDialogRef,public config: DynamicDialogConfig,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.data = this.config.data;
    this.initForm();
  }
  initForm(){
    this.formGroup = this.formBuilder.group({
      Resource: [this.data.Resource, Validators.required],
      Email: [this.data.Email, Validators.required],
      Role: [this.data.Role, Validators.required]
    });
  }
  Close() {
    this.dialog.close()
  }
}
