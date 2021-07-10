import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ToastController,
  AlertController,
  Platform,
} from '@ionic/angular';
import { AuthenticationService } from 'src/_services/authentication.service';
// import { Browser } from '@capacitor/browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
const {Browser} = Plugins

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  type = 'online';
  type2 = 'monnify';
  walletBalance: any;
  hasACN = false;
  ACDetails: any = [];
  fundWalletForm: FormGroup;
  monifyFundWalletForm: FormGroup;
  submitted = false;
  amountToPay: number;
  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private auth: AuthenticationService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private plt: Platform,
  ) {

    this.fundWalletForm = this.formBuilder.group({
      amount: [
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(2),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
    });
    this.monifyFundWalletForm = this.formBuilder.group({
      Mamount: [
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(2),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
    });

    Browser.addListener('browserFinished', () => {
      //console.log('Browser Finished');
    });
    Browser.addListener('browserPageLoaded', () => {
      //console.log('Browser Loaded');
    });
  }


  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.getAcno();
    this.getWalletDetails()
    await loading.dismiss();


    setTimeout(() => {
      this.presentAlert();
    }, 3000);


  }

  get f() {
    return this.fundWalletForm.controls;
  }

  get m() {
    return this.monifyFundWalletForm.controls;
  }

  async ionViewWillEnter() {
    this.getAcno();
    this.getWalletDetails()
    // this.createAcNo();
  }

  async getWalletDetails() {

    this.auth.getWalletDetails().subscribe(async (res: any) => {
      //console.log(res);
      this.walletBalance = res;


    });
  }

  async createAcNo() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.auth.createAcNo().subscribe(async (res: any) => {
      await loading.dismiss();
      //console.log(res);
      this.getAcno();
      const toast = await this.toastController.create({
        message: res,
        color: 'success',
        duration: 2000,
      });
      toast.present();
    });
  }

  async getAcno() {
    this.auth.getAcNo().subscribe(async (res: any) => {
      //console.log(res);
      if (res.accountNumber) {
        this.hasACN = true;
      } else this.hasACN = false;
      this.ACDetails = res;
    });
  }

  onClick() {
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Please Note',
      mode: 'ios',
      message: `
      <p>Use the form to process automatic funding of your wallet. It takes approximately 1-2 minutes for your wallet to get funded immediately after successful payment and verification of payment. You are required to fund your wallet using a Valid Debit card that belongs to you if your chosen option is the online wallet funding method or Bank account and name that belongs to you if the method you chose is bank transfer or deposit.</p>
      <p>We do not condone fraud or accept stolen card details. We advice you take our warning seriously as you will be arrested, prosecuted and jailed if found guilty.</p>
      <p>Minimum Funding of wallet for Resellers remains 2,000 naira while the minimum Funding for Beneficiaries is 100 naira. Funding of wallet above 80,000 naira requires a one-time BVN verification</p>
      `,
      buttons: ['OK'],
    });

    await alert.present();
  }
  segmentChanged(ev) {
    if (this.type === 'bank') {
      this.alert();
    }
  }
  segmentChanged2(ev) {}

  async alert() {
    const alert = await this.alertController.create({
      header: 'Please Note',
      mode: 'ios',
      message: `
      <p>Note: Any transaction below 5000 naira, kindly use Monnify as your payment type.</p>
      <p>Any Payment of 5000 naira above, You are eligible to use any payment option of your choice.</p>
      <p>Use your Nicktech monnify Reserved account to fund your wallet. Your Nicktech wallet gets credited automatically immediately payment is received and approved.</p>
      <p>Note there is a 54 naira flat fee extra charges for each payment. Minimum funding for Beneficiaries remains 100 naira and 2000 naira for Resellers.</p>
      `,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.submitted = true;
    // stop here if form is invalid
    if (this.fundWalletForm.invalid) {
      return;
    }
    this.auth.fundWallet(this.f.amount.value).subscribe(
      async (res: any) => {
        await loading.dismiss();
        //console.log(res);
        if (this.plt.is('mobile')) {
          await Browser.open({ url: res });
          Browser.addListener('browserFinished', () => {
            this.getWalletDetails()
            //console.log('Browser Finished');
          });
        } else {
          window.open(res);
        }
      },
      async (err) => {
        await loading.dismiss();
        //console.error(err);
        const message = `Fund Wallet Failed... <br/> ${err}`;
        //       this.presentToast(message, 'danger');
      }
    );
  }

  getAmount(amount: any) {
    const amount1: number =parseInt(amount);
    this.amountToPay = amount1 + 54;
    // //console.log(this.amountToPay)
    localStorage.setItem('amountToPay', JSON.stringify(this.amountToPay));
  }

  fundWithMoniffy() {
    const amount = this.m.Mamount.value;
    // //console.log(amount)

    this.router.navigateByUrl('/home/wallet/monnify')
  }



  async presentToast(message: any, color: any) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
    });
    toast.present();
  }
}
