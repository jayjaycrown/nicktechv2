import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/_services/authentication.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {

  type = 'mtn';
  userData: any = {};
  accountType: string;
  walletBalance: number;
  mtnRate: any = {};
  gloRate: any = {};
  airtelRate: any = {};
  etisalatRate: any = {};
  dataVol: number;
  amount: number;
  dataAmount: number;
  smeType: string;
  phoneNumber: number;
  insufficient: string;
  volumeType: string;
  nDataVol: any;
  constructor(
    private auth: AuthenticationService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
private platform: Platform,
  ) {

  }

  ionViewWillEnter() {
    this.getWalletDetails()
    this.getMtnRate();
    this.getGloRate();
    this.getAirtelRate();
    this.get9mobileRate();
    this.getUserDetails();
  }

  ngOnInit() {
  }
  getUserDetails() {
    this.auth.dashboard().subscribe(res => {
      // //console.log(res);
      this.userData = res.authData.user;
      // //console.log(this.userData);
      this.accountType = this.userData.accountType;
      // //console.log(this.accountType);
    })

  }
  getWalletDetails() {
    this.auth.getWalletDetails().subscribe(res => {
      // //console.log(res);
      this.walletBalance = parseInt(res);
      // //console.log(this.walletBalance)

    })

  }

  getMtnRate() {
    this.auth.mtnPrice().subscribe(res => {
      this.mtnRate = res;
      // //console.log(this.mtnRate);
    })
  }
  getGloRate() {
    this.auth.gloPrice().subscribe(res => {
      this.gloRate = res;
    })
  }
  getAirtelRate() {
    this.auth.airtelPrice().subscribe(res => {
      this.airtelRate = res;
    })
  }

  get9mobileRate() {
    this.auth.mobilePrice().subscribe(res => {
      this.etisalatRate = res;
    })
  }

  segmentChanged(ev) {
    this.dataAmount = null;
    this.dataVol = null;
    this.smeType = null;
    this.phoneNumber = null;
    this.insufficient = null;
  }

  getMtnDataPrice(value: any) {
    this.dataVol = parseInt(value);
    // //console.log(value)
    if (this.dataVol == 1000) {
      this.smeType = 'c'
    }else if(this.dataVol == 2000) {
      this.smeType = 'd'
    } else if(this.dataVol == 5000) {
      this.smeType = 'e'
    }
    else {
      this.smeType = 'unknown'
    }
    // //console.log(this.dataVol);
    // //console.log(this.smeType);


    if (this.accountType === 'Beneficiary') {
      this.amount = this.mtnRate.beneficiaryRate
      this.dataAmount = this.dataVol / 1000 * this.amount;
    } else {
      this.amount = this.mtnRate.resellersRate
      this.dataAmount = this.dataVol / 1000 * this.amount;
    }
    //console.log(this.dataAmount);
    //console.log(this.walletBalance)

    if (this.dataAmount > this.walletBalance) {
      this.insufficient = 'Insufficient Balance'
      // //console.log(this.insufficient);
    }
  }

  getAirtelDataPrice(value: any) {
    this.dataVol = parseInt(value);
    // //console.log(value)
    if (this.dataVol == 0) {
      this.volumeType = 'mb'
      if (this.accountType === 'Beneficiary') {
        this.amount = this.airtelRate.beneficiaryRate
        this.dataAmount = ( this.amount/100) * 500;
      } else {
        this.amount = this.airtelRate.resellersRate
        this.dataAmount = ( this.amount/100) * 500;
      }
    } else if (this.dataVol == 1) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.airtelRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 4000;
      } else {
        this.amount = this.airtelRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 4000;
      }
    }else if (this.dataVol == 2) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.airtelRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 3000;
      } else {
        this.amount = this.airtelRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 3000;
      }
    }else if (this.dataVol == 3) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.airtelRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 2500;
      } else {
        this.amount = this.airtelRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 2500;
      }
    }else if (this.dataVol == 4) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.airtelRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 2000;
      } else {
        this.amount = this.airtelRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 2000;
      }
    }else if (this.dataVol == 5) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.airtelRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 1500;
      } else {
        this.amount = this.airtelRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 1500;
      }
    }else if (this.dataVol == 6) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.airtelRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 1200;
      } else {
        this.amount = this.airtelRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 1200;
      }
    }else if (this.dataVol == 7) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.airtelRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 1000;
      } else {
        this.amount = this.airtelRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 1000;
      }
    }
    else {
      alert('Noooooooooo');
    }

    if (this.dataAmount > this.walletBalance) {
      this.insufficient = 'Insufficient Balance'
      // //console.log(this.insufficient);
    }
  }

  getEtisalatDataPrice(value: any) {
    this.dataVol = parseInt(value);
    // //console.log(value);
    // //console.log(value)
    if (this.dataVol == 12) {
      if (this.accountType === 'Beneficiary') {
        this.amount = this.etisalatRate.beneficiaryRate
        this.dataAmount = ( this.amount/100) * 500;
      } else {
        this.amount = this.etisalatRate.resellersRate
        this.dataAmount = ( this.amount/100) * 500;
      }
    }else if (this.dataVol == 7) {
      if (this.accountType === 'Beneficiary') {
        this.amount = this.etisalatRate.beneficiaryRate
        this.dataAmount = ( this.amount/100) * 1000;
      } else {
        this.amount = this.etisalatRate.resellersRate
        this.dataAmount = ( this.amount/100) * 1000;
      }
    }

    else if (this.dataVol == 25) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.etisalatRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 1200;
      } else {
        this.amount = this.etisalatRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 1200;
      }
    }else if (this.dataVol == 3) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.etisalatRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 1500;
      } else {
        this.amount = this.etisalatRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 1500;
      }
    }else if (this.dataVol == 8) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.etisalatRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 2000;
      } else {
        this.amount = this.etisalatRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 2000;
      }
    }else if (this.dataVol == 36) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.etisalatRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 4000;
      } else {
        this.amount = this.airtelRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 4000;
      }
    }
    else {
      alert('Noooooooooo');
    }

    if (this.dataAmount > this.walletBalance) {
      this.insufficient = 'Insufficient Balance'
      // //console.log(this.insufficient);
    }
  }


  getGloDataPrice(value: any) {
    this.dataVol = parseInt(value);
    // //console.log(value);
    // //console.log(value)
    if (this.dataVol == 57) {
      if (this.accountType === 'Beneficiary') {
        this.amount = this.gloRate.beneficiaryRate
        this.dataAmount = ( this.amount/100) * 500;
      } else {
        this.amount = this.gloRate.resellersRate
        this.dataAmount = ( this.amount/100) * 500;
      }
    }else if (this.dataVol == 53) {
      if (this.accountType === 'Beneficiary') {
        this.amount = this.gloRate.beneficiaryRate
        this.dataAmount = ( this.amount/100) * 1000;
      } else {
        this.amount = this.gloRate.resellersRate
        this.dataAmount = ( this.amount/100) * 1000;
      }
    }else if (this.dataVol == 16) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.gloRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 1500;
      } else {
        this.amount = this.gloRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 1500;
      }
    }else if (this.dataVol == 55) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.gloRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 2000;
      } else {
        this.amount = this.gloRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 2000;
      }
    }else if (this.dataVol == 58) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.gloRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 2500;
      } else {
        this.amount = this.gloRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 2500;
      }
    }else if (this.dataVol == 54) {
      this.volumeType = ''
      if (this.accountType === 'Beneficiary') {
        this.amount = this.gloRate.beneficiaryRate
        this.dataAmount =  ( this.amount/ 100) * 3000;
      } else {
        this.amount = this.airtelRate.resellersRate
        this.dataAmount =  ( this.amount/ 100) * 3000;
      }
    }
    else {
      alert('Noooooooooo');
    }

    if (this.dataAmount > this.walletBalance) {
      this.insufficient = 'Insufficient Balance'
      // //console.log(this.insufficient);
    }
  }
  getPhone(value: any) {
    this.phoneNumber = parseInt(value);
  }
  async onSubmit(data: NgForm) {
    // //console.log(data.value);
    // //console.log(data.value.phoneNumber.value)
    const obj = {
      dataVol: this.dataVol,
      dataAmount: this.dataAmount,
      phoneNumber: '0'+ this.phoneNumber,
      smeType : this.smeType
    }
    // //console.log(obj);
    const loading = await this.loadingController.create({
        message: 'Loading...',
        duration: 2000,
        spinner: 'bubbles'
      });
    await loading.present();
    this.auth.buyDataMtn(obj).subscribe(async (res: any) => {
      //console.log(res);
      this.presentToast(res, 'primary')
      await loading.dismiss();
    }, async err => {
        await loading.dismiss();
        const alert = await this.alertController.create({
            header: 'Failed!!!',
          subHeader: err,
            mode: 'ios',
            message: 'Unable to Purchase data, Check details and try again. Your wallet balance might be low to buy the amount you are requesting.',
            buttons: ['OK']
          });

          await alert.present();
    })
  }

  async onSubmitAirtel(data) {
    // //console.log(data.value);
    // //console.log(data.value.phoneNumber.value)
    if (this.dataVol == 0) {
      this.nDataVol = ''
    } else {
      this.nDataVol = this.dataVol
    }
    const obj = {
      dataVol: this.nDataVol,
      dataAmount: this.dataAmount,
      phoneNumber: '0'+ this.phoneNumber,
      volumeType : this.volumeType
    }
    // //console.log(obj);
    const loading = await this.loadingController.create({
        message: 'Loading...',
        duration: 2000,
        spinner: 'bubbles'
      });
    await loading.present();
    this.auth.buyDataAirtel(obj).subscribe(async (res: any) => {
      //console.log(res)
      this.presentToast(res, 'primary')
      await loading.dismiss();
    }, async err => {

        await loading.dismiss();
        const alert = await this.alertController.create({
            header: 'Failed!!!',
          subHeader: err,
            mode: 'ios',
            message: 'Unable to Purchase data, Check details and try again. Your wallet balance might be low to buy the amount you are requesting.',
            buttons: ['OK']
          });

          await alert.present();
    })
  }

  async onSubmitEtisalat(buyEtisalatData) {
  //  //console.log(buyEtisalatData.value)
    const obj = {
      dataVol: this.dataVol,
      dataAmount: this.dataAmount,
      phoneNumber: '0'+ this.phoneNumber,
    }
    // //console.log(obj);
    const loading = await this.loadingController.create({
        message: 'Loading...',
        duration: 2000,
        spinner: 'bubbles'
      });
    await loading.present();
    this.auth.buyEtisalatData(obj).subscribe(async (res: any) => {
      //console.log(res)
      this.presentToast(res, 'primary')
      await loading.dismiss();
    }, async err => {

        await loading.dismiss();
        const alert = await this.alertController.create({
            header: 'Failed!!!',
          subHeader: err,
            mode: 'ios',
            message: 'Unable to Purchase data, Check details and try again. Your wallet balance might be low to buy the amount you are requesting.',
            buttons: ['OK']
          });

          await alert.present();
    })

  }

  async onSubmitGLo(data) {
  //  //console.log(data.value)
    const obj = {
      dataVol: this.dataVol,
      dataAmount: this.dataAmount,
      phoneNumber: '0'+ this.phoneNumber,
    }
    //console.log(obj);
    const loading = await this.loadingController.create({
        message: 'Loading...',
        duration: 2000,
        spinner: 'bubbles'
      });
    await loading.present();
    this.auth.buyGloData(obj).subscribe(async (res: any) => {
      //console.log(res)
      this.presentToast(res, 'primary')
      await loading.dismiss();
    }, async err => {

        await loading.dismiss();
        const alert = await this.alertController.create({
            header: 'Failed!!!',
          subHeader: err,
            mode: 'ios',
            message: 'Unable to Purchase data, Check details and try again. Your wallet balance might be low to buy the amount you are requesting.',
            buttons: ['OK']
          });

          await alert.present();
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
}
