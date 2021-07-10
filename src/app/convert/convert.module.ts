import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvertPageRoutingModule } from './convert-routing.module';

import { ConvertPage } from './convert.page';
import { BankComponent } from './bank/bank.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvertPageRoutingModule
  ],
  declarations: [ConvertPage, BankComponent]
})
export class ConvertPageModule {}
