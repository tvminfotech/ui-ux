import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-internal-resource',
  templateUrl: './add-internal-resource.component.html',
  styleUrls: ['./add-internal-resource.component.css']
})
export class AddInternalResourceComponent implements OnInit {
  roleModel :any=null;
  nameModel:any=null;
  constructor(public dialog: DynamicDialogRef) { }

  ngOnInit(): void {
  }
  Close() {
    this.dialog.close()
  }
}
