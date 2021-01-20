import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { ManageSubscriptionComponent } from './manage-subscription/manage-subscription.component';
import { ExpandYourTeamComponent } from './expand-your-team/expand-your-team.component';
import { PurchaseSubscriptionComponent } from './purchase-subscription/purchase-subscription.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';


@NgModule({
  declarations: [ManageSubscriptionComponent, ExpandYourTeamComponent, PurchaseSubscriptionComponent, MakePaymentComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
