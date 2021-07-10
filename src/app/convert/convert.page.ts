import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/_services/authentication.service';
import { BankComponent } from './bank/bank.component';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.page.html',
  styleUrls: ['./convert.page.scss'],
})
export class ConvertPage implements OnInit {

  bank = false;
  number: string;
  amountToReceive: number;
  receivingMode: string;
  walletBalance: number;
  constructor(
    private alertController: AlertController,
    // private modalController: ModalController,
    private auth: AuthenticationService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router,
    private platform: Platform,
  ) {}

  ngOnInit() {
    this.getWalletDetails()
    setTimeout(() => {
      this.presentAlert()
    }, 3000);
  }

  getWalletDetails() {
    this.auth.getWalletDetails().subscribe(res => {
      // //console.log(res);
      this.walletBalance = parseInt(res);
      // //console.log(this.walletBalance)

    })

  }

  onClick() {
    this.presentAlert()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Please Note',
      mode: 'ios',
      message: `
      <p>Use the submit button only after you have transfered the airtime to our phone number. We do not automatically deduct airtime from your phone. Any false submission may lead to termination of same account.</p>
      <p>It takes approximately 5-20 minuttes for airtime sent to get verified and credited into your wallet while bank transfer takes up to 24-48 hours after authorization and are only processed during banking days and hours. We charge an extra fee of N50 during transaction.</p>
      <p>We do not condone fraud or accept stolen airtime. We advice you take our warning seriously as you will be arrested, prosecuted and jailed if found guilty.</p>
      `,
      buttons: ['OK']
    });

    await alert.present();
  }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //   component: BankComponent,
  //   componentProps: { value: 123 }
  //   });

  //   await modal.present();

  //   const data = await modal.onDidDismiss();
  //   //console.log(data)

  // }

  selectMode(ev) {
    if (ev == 'Bank') {
      this.bank = true;
      this.receivingMode = 'Bank'
    } else {
      this.bank = false;
      this.receivingMode = 'wallet'
    }
  }

  getAmount(ev) {
    const percentage: number = 0.7;
    this.amountToReceive = percentage * ev

    // //console.log(this.amountToReceive)
  }

  getNumber(ev) {
    if (ev == 'MTN') {
      this.number = '07068389800';
    }else if (ev == 'GLO') {
      this.number = '08150519292';
    }else if (ev == '9MOBILE') {
      this.number = '09083756893';
    }else if (ev == 'AIRTEL') {
      this.number = '09022398335';
    } else {
      this.number = null;
    }
  }

  async onSubmit(data: NgForm) {
    //console.log(data.value);
    const loading = await this.loadingController.create({
        message: 'Loading...',
        duration: 2000,
        spinner: 'bubbles'
      });
    await loading.present();
    this.auth.convert(data.value).subscribe(async res => {
      await loading.dismiss();
      this.presentToast(res, 'primary')
      this.router.navigateByUrl('/home/dashboard');
    }, async err => {
        await loading.dismiss();
      this.presentToast(err, 'danger')
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
