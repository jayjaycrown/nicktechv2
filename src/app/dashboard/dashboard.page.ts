import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/_services/authentication.service';
// import { Browser } from '@capacitor/browser';
import { Plugins } from '@capacitor/core';
const {Browser} = Plugins

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  walletBalance: any;
  hasACN = false;
  ACDetails: any = [];
  userData: any = {};
  accountType: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform,
  ) {  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });
    await loading.present();
    this.getUserDetails()
    this.auth.getWalletDetails().subscribe(async (res: any) => {
      //console.log(res);
      this.walletBalance = res;
      await loading.dismiss();
      this.getAcno()
    })
  }

  async ionViewWillEnter() {
    this.getUserDetails()
    this.auth.getWalletDetails().subscribe(async (res: any) => {
      //console.log(res);
      this.walletBalance = res;
      this.getAcno()
    })
  }

  async createAcNo() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });
    await loading.present();
    this.auth.createAcNo().subscribe(async (res: any) => {
      await loading.dismiss();
      //console.log(res);
      this.getAcno();
      const toast = await this.toastController.create({
        message: res,
        color: 'success',
        duration: 2000
        });
        toast.present();

    })
  }

  async getAcno() {
    this.auth.getAcNo().subscribe(async (res: any) => {
      //console.log(res);
      if (res.accountNumber) {
        this.hasACN = true
      } else this.hasACN = false;
      this.ACDetails = res;
    })
  }

  buyAirtime() {
    this.router.navigateByUrl('/home/airtime')
  }
  buyData() {
    this.router.navigateByUrl('/home/data')
  }
  convert() {
    this.router.navigateByUrl('/home/convert')
  }
  transactions() {
    this.router.navigateByUrl('/home/history')
  }

  async gotoHelp() {
    if (this.platform.is('mobile')) {
          await Browser.open({ url: 'https://nicktech.com.ng/contact' });
          Browser.addListener('browserFinished', () => {
          });
        } else {
          window.open('https://nicktech.com.ng/contact');
        }
    // window.open();
  }

  getUserDetails() {
    this.auth.dashboard().subscribe(res => {
      this.userData = res.authData.user;
      // console.log(this.userData);
      this.accountType = this.userData.accountType;
    })

  }

}
