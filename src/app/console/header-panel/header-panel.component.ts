import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../utils/common.service';
@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.css']
})
export class HeaderPanelComponent implements OnInit {
  userName:any;
  constructor(private commonService:CommonService) { }
  

  ngOnInit(): void {
  }
  logout()
  {
    location.href="";
  }

}
