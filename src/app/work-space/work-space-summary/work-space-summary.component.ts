import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../utils/common.service';
import { WorkSpaceSummaryService } from './work-space-summary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-work-space-summary',
  templateUrl: './work-space-summary.component.html',
  styleUrls: ['./work-space-summary.component.css']
})
export class WorkSpaceSummaryComponent implements OnInit {

  POCDetails: any;
  boardId: string;
  wsPocId: string;
  micrositeId: string;
  constructor(private actRoute: ActivatedRoute,
    private workSpaceSummary: WorkSpaceSummaryService,
    private commonService: CommonService,
    private route: Router) { }

  ngOnInit(): void {
    this.getParams();
    this.getPOCDTL();
  }

  onClosePOC() {
  }

  onManagePOC() {
    this.route.navigateByUrl('/workspace/' + this.wsPocId + '/edit-workspace')
    //this.route.navigateByUrl('/workspace/view/' + this.wsPocId + '/' + this.POCDetails.pocName + '/4424/phase/information-architecture' );
  }

  getPOCDTL() {
    const param = { micrositeId: this.micrositeId, pocId: this.wsPocId };
    this.workSpaceSummary.getPOCDtl(param)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.result_status == 'SUCCESS') {
            this.POCDetails = data.result_data;
            return;
          }
          this.commonService.failureMessage(data['result_msg']);
        },
        error => {
        });
  }

  getParams() {
    this.actRoute.parent.paramMap
      .subscribe(params => {
        //console.log(params['params'],"Process-flow")
        this.boardId = params['params'].boardId;
        this.wsPocId = params['params'].subNav
      });
    this.micrositeId = JSON.parse(localStorage.getItem('micrositeId'));
  }

}
