import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LivestockFormComponent } from './ownerComponents/livestock-form/livestock-form.component';
import { MyRequestComponent } from './ownerComponents/my-request/my-request.component';
import { OwnerNavbarComponent } from './ownerComponents/owner-navbar/owner-navbar.component';
import { OwnerViewfeedComponent } from './ownerComponents/owner-viewfeed/owner-viewfeed.component';
import { ViewLivestockComponent } from './ownerComponents/view-livestock/view-livestock.component';
import { AddFeedComponent } from './supplierComponents/add-feed/add-feed.component';
import { SupplierNavbarComponent } from './supplierComponents/supplier-navbar/supplier-navbar.component';
import { ViewFeedComponent } from './supplierComponents/view-feed/view-feed.component';
import { ViewRequestComponent } from './supplierComponents/view-request/view-request.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'
import {ToastrModule} from 'ngx-toastr'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AuthInterceptor } from './components/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    LivestockFormComponent,
    MyRequestComponent,
    OwnerNavbarComponent,
    OwnerViewfeedComponent,
    ViewLivestockComponent,
    AddFeedComponent,
    SupplierNavbarComponent,
    ViewFeedComponent,
    ViewRequestComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
