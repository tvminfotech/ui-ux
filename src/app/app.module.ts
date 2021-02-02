import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkSpaceModule } from './work-space/work-space.module';
import {SubscriptionModule} from './subscription/subscription.module';
// import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './console/login/login.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppConfigService } from './utils/app-config.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    WorkSpaceModule, 
    SubscriptionModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule,
    NgxUiLoaderModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AppLoader,
      deps: [AppConfigService],
      multi: true
    },
    AppConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function AppLoader(_appConfig: AppConfigService) {
  return () => _appConfig.getAppConfigs();
}