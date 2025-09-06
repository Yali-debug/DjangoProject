import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CentresInteretPageRoutingModule } from './centres-interet-routing.module';

import { CentresInteretPage } from './centres-interet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CentresInteretPageRoutingModule
  ],
  declarations: [CentresInteretPage]
})
export class CentresInteretPageModule {}
