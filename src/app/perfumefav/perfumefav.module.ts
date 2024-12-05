import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfumefavPageRoutingModule } from './perfumefav-routing.module';

import { PerfumefavPage } from './perfumefav.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfumefavPageRoutingModule
  ],
  declarations: [PerfumefavPage]
})
export class PerfumefavPageModule {}
