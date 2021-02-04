import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef} from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-sucess',
  templateUrl: './sign-up-sucess.component.html',
  styles: []
})
export class SignUpSucessComponent implements OnInit {

  constructor(public dialog : DynamicDialogRef,
    private router: Router) { }

  ngOnInit(): void {
  }
  Close()
  {
    this.router.navigate(['/workspace'])
    this.dialog.close()
  }

}
