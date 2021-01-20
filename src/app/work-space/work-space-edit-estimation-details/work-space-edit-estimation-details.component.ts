import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-work-space-edit-estimation-details',
  templateUrl: './work-space-edit-estimation-details.component.html',
  styleUrls: ['./work-space-edit-estimation-details.component.css']
})
export class WorkSpaceEditEstimationDetailsComponent implements OnInit {

  constructor(public dialog: DynamicDialogRef) { }

  ngOnInit(): void {
  }
  Close() {
    this.dialog.close()
  }
}
