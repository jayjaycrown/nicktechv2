import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/_services/authentication.service';
import { EditPhoneComponent } from './edit-phone/edit-phone.component';
import { VerifyBvnComponent } from './verify-bvn/verify-bvn.component';
// import { menuController } from "@ionic/core";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  users: any = [];
  bvnVerify = false;
  mode;
  status: any ;
  test: any;
  constructor(
    public modalController: ModalController,
    private auth: AuthenticationService,
    private platform: Platform,
  ) {
  }

  async ionViewWillEnter() {
    // localStorage.setItem('currentUser', JSON.stringify(user));
    this.test = localStorage.getItem('test-key')
    // this.test = await Storage.get({ key: another_Key })
    this.status = this.test
    // console.log(this.status)
    setTimeout(() => {
      if (this.status === 'false') {
        this.mode = 'Dark'
      }
      if (this.status === 'true') {
        this.mode = 'Light'
      }
      // console.log(this.mode);
    });
  }

  ngOnInit() {
    this.auth.getProfile().subscribe((res: any) => {
      // console.log(res);
      this.users = res;
      let bvn = this.users.bvnVerify;
      if (bvn = 'No') {
        this.bvnVerify = true
      } else this.bvnVerify = false;
    })
  }

  async editPhone() {
    const modal = await this.modalController.create({
      component: EditPhoneComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async verifyBVN() {
    const modal = await this.modalController.create({
      component: VerifyBvnComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async changeStatus(status) {
    // console.log(status)
    this.status = status;

    let message = '';
    let color = '';
    if (status === true) {
      localStorage.setItem('test-key', 'true');
    // const test = localStorage.getItem('test-key')
      // await Storage.set({ key: 'test-key', value: 'true' });
      setTimeout(() => {
        document.querySelector('body').classList.add('dark')
        // console.log(document.body.className)
        this.mode = 'Light'
        // console.log(this.mode)
      });
    }
    else {
      localStorage.setItem('test-key', 'false');
      // await Storage.set({ key: 'test-key', value: 'false' });
      setTimeout(() => {
        document.querySelector('body').classList.remove('dark')
        // document.body.className.replace('nil', 'dark');
        // console.log(document.body.className)
        this.mode = 'Dark'
        // console.log(this.mode)
      });
    }

  }

  logout() {
    this.auth.logout();
  }

}
