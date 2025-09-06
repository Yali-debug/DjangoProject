import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CentresInteretPage } from './centres-interet.page';

const routes: Routes = [
  {
    path: '',
    component: CentresInteretPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentresInteretPageRoutingModule {}
