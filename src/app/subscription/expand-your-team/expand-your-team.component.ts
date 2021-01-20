import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-expand-your-team',
  templateUrl: './expand-your-team.component.html',
  styleUrls: ['./expand-your-team.component.css']
})
export class ExpandYourTeamComponent implements OnInit {

  constructor(public dialog: DynamicDialogRef) { }

  ngOnInit(): void {
  }
  Close() {
    this.dialog.close()
  }
}
