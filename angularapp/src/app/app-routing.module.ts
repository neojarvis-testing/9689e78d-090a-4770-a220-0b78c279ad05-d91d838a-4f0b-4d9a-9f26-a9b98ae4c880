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

const routes: Routes = [
  {path:'error-page',component:ErrorPageComponent},
  {path:'home-page',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'supplier/navbar',component:SupplierNavbarComponent},
  {path:'supplier/add-feed',component:AddFeedComponent},
  {path:'supplier/add-feed/:id',component:AddFeedComponent},
  {path:'supplier/view-feed',component:ViewFeedComponent},
  {path:'supplier/view-request',component:ViewRequestComponent},
  {path:'owner/navbar',component:OwnerNavbarComponent},
  {path:'owner/livestock-form',component:LivestockFormComponent},
  {path:'owner/livestock-form/:id',component:LivestockFormComponent},
  {path:'owner/my-request',component:MyRequestComponent},
  {path:'owner/view-feed',component:OwnerViewfeedComponent},
  {path:'owner/view-livestock',component:ViewLivestockComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
