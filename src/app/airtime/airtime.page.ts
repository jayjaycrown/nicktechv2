import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-airtime',
  templateUrl: './airtime.page.html',
  styleUrls: ['./airtime.page.scss'],
})
export class AirtimePage implements OnInit {
  mtnVtuRate: any;
  mtnSaSRate: any;
  airtelRate: any;
  gloRate: any;
  etisalatRate: any;
  model: any = {};
  network: any = 'MTN';
  buyMtn = false;
  buyGlo = false;
  buyAirtel = false;
  buyEtisalat = false;
  insufficient: string;
  view: number;
  userData: any;
  accountType: any;
  amount: any;
  type: any;
  walletBalance: number;
  amountLow = false;
  networkSelect = 'mtn';

  constructor(
    private auth: AuthenticationService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buyMtn = true;
    this.getMtnVTUPrice()
    this.getMtnSandSPrice()
    this.getAirtelPrice()
    this.getGloPrice()
    this.getEtisalatPrice()
    this.getUserDetails()
    this.getWalletDetails()
  }

  getWalletDetails() {
    this.auth.getWalletDetails().subscribe(res => {
      // console.log(res);
      this.walletBalance = parseInt(res);
      // console.log(this.walletBalance)

    })

  }

  getUserDetails() {
    this.auth.dashboard().subscribe(res => {
      // console.log(res);
      this.userData = res.authData.user;
      // console.log(this.userData);
      this.accountType = this.userData.accountType;
      // console.log(this.accountType);
    })

  }

  getMtnVTUPrice() {
    this.auth.mtnVTUPrice().subscribe(res=>{
      this.mtnVtuRate = res;
      // console.log(this.mtnVtuRate)
    })
  }
  getMtnSandSPrice() {
    this.auth.mtnAirtimeSandSPrice().subscribe(res=>{
      this.mtnSaSRate = res;
    })
  }
  getAirtelPrice() {
    this.auth.airtelVTUPrice().subscribe(res=>{
      this.airtelRate = res;
    })
  }
  getGloPrice() {
    this.auth.gloVTUPrice().subscribe(res=>{
      this.gloRate = res;
    })
  }
  getEtisalatPrice() {
    this.auth.etisalatVTUPrice().subscribe(res=>{
      this.etisalatRate = res;
    })
  }

  networkType(ev) {
    if (ev == 'MTN') {
      this.buyMtn = true
      this.buyGlo = false;
      this.buyAirtel = false;
      this.buyEtisalat = false;
    } else if(ev == 'GLO') {
      this.buyGlo = true
      this.buyMtn = false
      this.buyAirtel = false;
      this.buyEtisalat = false;
    }else if(ev == 'ETISALAT') {
      this.buyEtisalat = true
      this.buyMtn = false
      this.buyGlo = false;
      this.buyAirtel = false;
    }else if(ev == 'AIRTEL') {
      this.buyAirtel = true
      this.buyMtn = false
      this.buyGlo = false;
      this.buyEtisalat = false;
    } else {
      this.buyMtn = false
      this.buyGlo = false;
      this.buyAirtel = false;
      this.buyEtisalat = false;
    }
  }

  getType(ev) {
    this.type = ev;
  }

  getAmount(ev) {
    if (ev < 100) {
      this.amountLow = true;
    }else this.amountLow = false;
    if (this.type == 'VTU') {
        if (this.accountType === 'Beneficiary') {
          this.amount = this.mtnVtuRate.beneficiaryRate
          this.view = ( this.amount/100) * ev;
        } else {
          this.amount = this.mtnVtuRate.resellersRate
          this.view = ( this.amount/100) * ev;
        }
    } else {
      if (this.accountType === 'Beneficiary') {
        this.amount = this.mtnSaSRate.beneficiaryRate
        this.view = ( this.amount/100) * ev;
      } else {
        this.amount = this.mtnSaSRate.resellersRate
        this.view = ( this.amount/100) * ev;
      }
    }

    if (this.view > this.walletBalance) {
      this.insufficient = 'Insufficient Balance'
      // console.log(this.insufficient);
    }
    else {
      this.insufficient = null
    }

  }


  getAmountGLo(ev: number) {
    if (ev < 100) {
      this.amountLow = true;
    }else this.amountLow = false;
    if (this.accountType === 'Beneficiary') {
          this.amount = this.gloRate.beneficiaryRate
          this.view = ( this.amount/100) * ev;
        } else {
          this.amount = this.gloRate.resellersRate
          this.view = ( this.amount/100) * ev;
        }

    if (this.view > this.walletBalance) {
      this.insufficient = 'Insufficient Balance'
    }
    else {
      this.insufficient = null
    }

  }

  getAmountAirtel(ev) {
    if (ev < 100) {
      this.amountLow = true;
    }else this.amountLow = false;
    if (this.accountType === 'Beneficiary') {
          this.amount = this.airtelRate.beneficiaryRate
          this.view = ( this.amount/100) * ev;
        } else {
          this.amount = this.airtelRate.resellersRate
          this.view = ( this.amount/100) * ev;
        }

    if (this.view > this.walletBalance) {
      this.insufficient = 'Insufficient Balance'
    }
    else {
      this.insufficient = null
    }

  }

  getAmountEtisalat(ev) {
    if (ev < 100) {
      this.amountLow = true;
    } else this.amountLow = false;
    if (this.accountType === 'Beneficiary') {
          this.amount = this.etisalatRate.beneficiaryRate
          this.view = ( this.amount/100) * ev;
        } else {
          this.amount = this.etisalatRate.resellersRate
          this.view = ( this.amount/100) * ev;
        }

    if (this.view > this.walletBalance) {
      this.insufficient = 'Insufficient Balance'
    }
    else {
      this.insufficient = null
    }

  }

  async onSubmit(data) {
    console.log(data.value)
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
    this.auth.buyMtnAirtime(data.value).subscribe(async (res: any) => {
      await loading.dismiss();
      this.presentToast(res, 'success');
      this.router.navigateByUrl('/home/dashboard');
    }, async err => {
        await loading.dismiss();
        console.log(err);
        this.presentAlert('Unable to purchase Airtime. Please try again or check your wallet balance');
    })
  }

  async onGloSubmit(data: NgForm) {
    console.log(data.value)
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
    this.auth.buyGloAirtime(data.value).subscribe(async (res: any) => {
      await loading.dismiss();
      this.presentToast(res, 'success');
      this.router.navigateByUrl('/home/dashboard');
    }, async err => {
        await loading.dismiss();
        console.log(err);
        this.presentAlert('Unable to purchase Airtime. Please try again or check your wallet balance');
    })
  }

  async onAirtelSubmit(data) {
    console.log(data.value)
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
    this.auth.buyAirtelAirtime(data.value).subscribe(async (res: any) => {
      await loading.dismiss();
      this.presentToast(res, 'success');
      this.router.navigateByUrl('/home/dashboard');
    }, async err => {
        await loading.dismiss();
        console.log(err);
        this.presentAlert('Unable to purchase Airtime. Please try again or check your wallet balance');
    })
  }

  async onEtisalatSubmit(data) {
    console.log(data.value)
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
    this.auth.buyEtisalatAirtime(data.value).subscribe(async (res: any) => {
      await loading.dismiss();
      this.presentToast(res, 'success');
      this.router.navigateByUrl('/home/dashboard');
    }, async err => {
        await loading.dismiss();
        console.log(err);
        this.presentAlert('Unable to purchase Airtime. Please try again or check your wallet balance');
    })
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Failed!!',
      message,
      mode: 'ios',
      buttons: ['OK']
    });

    await alert.present();
  }

  segmentChanged(ev) {
    this.view = null
    this.insufficient = null
    // this.dataAmount = null;
    // this.dataVol = null;
    // this.smeType = null;
    // this.phoneNumber = null;
    // this.insufficient = null;
  }
}
