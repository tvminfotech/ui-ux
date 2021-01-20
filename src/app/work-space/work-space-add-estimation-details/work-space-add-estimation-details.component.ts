import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-work-space-add-estimation-details',
  templateUrl: './work-space-add-estimation-details.component.html',
  styleUrls: ['./work-space-add-estimation-details.component.css']
})
export class WorkSpaceAddEstimationDetailsComponent implements OnInit {

  constructor(public dialog: DynamicDialogRef) { }

  ngOnInit(): void {
  }
  Close() {
    this.dialog.close()
  }

}
