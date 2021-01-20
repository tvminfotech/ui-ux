import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkSpaceLandingComponent} from 'src/app/work-space/work-space-landing/work-space-landing.component';
import { ManageSubscriptionComponent } from './manage-subscription/manage-subscription.component';
import { PurchaseSubscriptionComponent } from './purchase-subscription/purchase-subscription.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';

const routes: Routes = [
  {
    path: 'subscription',
    component: WorkSpaceLandingComponent,
    children: [
      { path: 'manage-subscription', component: ManageSubscriptionComponent},
      {path : 'purchase-subcription',component:PurchaseSubscriptionComponent},
      {path : 'make-payment',component:MakePaymentComponent}
     ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
