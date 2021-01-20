import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-subscription',
  templateUrl: './purchase-subscription.component.html',
  styleUrls: ['./purchase-subscription.component.css']
})
export class PurchaseSubscriptionComponent implements OnInit {
 seatLists=[];
 basicPMAmt:number=4;
 basicAmt:number=20;
 stdPMAmt:number=8;
 stdAmt:number=40;
 proPMAmt:number=20;
 proAmt:number=100;
 selectedSeatsIndex =0;
  constructor() { }

  ngOnInit(): void {
    this.proto();
  }
  proto()
  {
    this.seatLists =[
    {"seats":"5"},
    {"seats":"10"},
    {"seats":"15"},
    {"seats":"20"},
    {"seats":"25"},
    {"seats":"30"},
    {"seats":"40"},
    {"seats":"50"},
    {"seats":"100"}
    ];
  }
  selectedSeats(item,value,ix)
  {
    this.selectedSeatsIndex =ix;
    this.basicAmt = this.basicPMAmt* value;
    this.stdAmt = this.stdPMAmt* value;
    this.proAmt = this.proPMAmt* value;
  }
}
