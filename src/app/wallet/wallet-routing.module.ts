import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonnifyPayComponent } from './monnify-pay/monnify-pay.component';

import { WalletPage } from './wallet.page';

const routes: Routes = [
  {
    path: '',
    component: WalletPage
  },
  {
    path: 'monnify',
    component: MonnifyPayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPageRoutingModule {}
