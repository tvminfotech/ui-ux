import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-sign-up-sucess',
  templateUrl: './sign-up-sucess.component.html',
  styles: []
})
export class SignUpSucessComponent implements OnInit {

  constructor(public dialog : DynamicDialogRef) { }

  ngOnInit(): void {
  }
  Close()
  {
    this.dialog.close()
  }

}
