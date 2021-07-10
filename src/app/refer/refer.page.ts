import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.page.html',
  styleUrls: ['./refer.page.scss'],
})
export class ReferPage implements OnInit {

  isRefAvailable = false;
  refLink: string;
  refDetails: any = [];
  downliners: any = [];
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform,
  ) {

  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
        message: 'Loading...',
        duration: 2000,
        spinner: 'bubbles'
      });
    await loading.present();
    this.getRefLink();
    this.getDownliners();
    await loading.dismiss();
  }

  ionViewWillEnter() {
    this.getRefLink();
    this.getDownliners();
  }

  async getRefLink() {

    this.auth.getRefLink().subscribe(async (res: any) => {
      //console.log(res)
      this.refDetails = res;
      this.refLink = res.referralLink
      if (this.refLink === "No link generated yet") {
        this.isRefAvailable = true
      } else {
        this.isRefAvailable = false;
      }
    }, async err => {
        this.presentToast(err, 'danger')
    })
  }

  async createLink() {
    const loading = await this.loadingController.create({
        message: 'Loading...',
        duration: 2000,
        spinner: 'bubbles'
      });
    await loading.present();
    this.auth.createRefLink().subscribe(async (res: any) => {
      await loading.dismiss();
      //console.log(res);
      this.getRefLink();
      this.presentToast(res, 'primary')
    }, async (err: any) => {
        await loading.dismiss();
      this.presentToast(err, 'primary')
    })
  }

  async copyReferral(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    const toast = await this.toastController.create({
        message: 'Copied!',
      duration: 2000,
        color: 'success'
      });
      toast.present();
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  async getDownliners() {

    this.auth.getDownliners().subscribe(async res => {
      //console.log(res)
      this.downliners = res;
    }, async err => {
        this.presentToast(err, 'danger')
    })

  }
}
