import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { TicketPageRoutingModule } from './ticket-routing.module';

import { TicketPage } from './ticket.page';
import { CreateComponent } from "./create/create.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TicketPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [TicketPage, CreateComponent]
})
export class TicketPageModule {}
