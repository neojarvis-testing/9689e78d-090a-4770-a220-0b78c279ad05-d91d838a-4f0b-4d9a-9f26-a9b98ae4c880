import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { OwnerNavbarComponent } from './ownerComponents/owner-navbar/owner-navbar.component';
import { SupplierNavbarComponent } from './supplierComponents/supplier-navbar/supplier-navbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AddFeedComponent } from './supplierComponents/add-feed/add-feed.component';
import { ViewFeedComponent } from './supplierComponents/view-feed/view-feed.component';
import { ViewRequestComponent } from './supplierComponents/view-request/view-request.component';
import { LivestockFormComponent } from './ownerComponents/livestock-form/livestock-form.component';
import { MyRequestComponent } from './ownerComponents/my-request/my-request.component';
import { OwnerViewfeedComponent } from './ownerComponents/owner-viewfeed/owner-viewfeed.component';
import { ViewLivestockComponent } from './ownerComponents/view-livestock/view-livestock.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthguardGuard } from './components/authguard/authguard.guard';
const routes: Routes = [
  {path:'error-page',component:ErrorPageComponent},
  {path:'home-page',component:HomePageComponent,canActivate: [AuthguardGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'supplier/navbar',component:SupplierNavbarComponent,canActivate: [AuthguardGuard]},
  {path:'supplier/add-feed',component:AddFeedComponent,canActivate: [AuthguardGuard]},
  {path:'supplier/add-feed/:id',component:AddFeedComponent,canActivate: [AuthguardGuard]},
  {path:'supplier/view-feed',component:ViewFeedComponent,canActivate: [AuthguardGuard]},
  {path:'supplier/view-request',component:ViewRequestComponent,canActivate: [AuthguardGuard]},
  {path:'owner/navbar',component:OwnerNavbarComponent,canActivate: [AuthguardGuard]},
  {path:'owner/livestock-form',component:LivestockFormComponent,canActivate: [AuthguardGuard]},
  {path:'owner/livestock-form/:id',component:LivestockFormComponent,canActivate: [AuthguardGuard]},
  {path:'owner/my-request',component:MyRequestComponent,canActivate: [AuthguardGuard]},
  {path:'owner/view-feed',component:OwnerViewfeedComponent,canActivate: [AuthguardGuard]},
  {path:'owner/view-livestock',component:ViewLivestockComponent,canActivate: [AuthguardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

