import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { VerifyBvnComponent } from './verify-bvn/verify-bvn.component';
import { EditPhoneComponent } from './edit-phone/edit-phone.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, VerifyBvnComponent, EditPhoneComponent]
})
export class ProfilePageModule {}
