import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfumefavPage } from './perfumefav.page';

const routes: Routes = [
  {
    path: '',
    component: PerfumefavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfumefavPageRoutingModule {}
