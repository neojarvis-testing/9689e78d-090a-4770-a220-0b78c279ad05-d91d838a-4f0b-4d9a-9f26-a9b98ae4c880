import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivestockFormComponent } from './ownerComponents/livestock-form/livestock-form.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
