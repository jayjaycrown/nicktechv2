import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/_services/authentication.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-monnify-pay',
  templateUrl: './monnify-pay.component.html',
  styleUrls: ['./monnify-pay.component.scss'],
})
export class MonnifyPayComponent implements OnInit {

  amount: any;
  walletBalance: any = [];
  ACDetails: any = [];
  constructor(
    public modalController: ModalController,
    private router: Router,
    private auth: AuthenticationService,
    private loadingController: LoadingController,
  ) {
    this.amount =  localStorage.getItem('amountToPay');
    console.log(this.amount)
  }


  ngOnInit() { }

  ionViewWillEnter() {
    this.getAcno()
    this.getWalletDetails()
  }

  async getWalletDetails() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.auth.getWalletDetails().subscribe(async (res: any) => {
      console.log(res);
      this.walletBalance = res;
      await loading.dismiss();

    });
  }

  async getAcno() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.auth.getAcNo().subscribe(async (res: any) => {
      await loading.dismiss();
      console.log(res);
      this.ACDetails = res;
    }, err => {
        console.log(err);
    });
  }

  close() {
    this.router.navigateByUrl('/home/wallet');
    localStorage.removeItem('amountToPay');
  }

  complete() {
    this.close();
  }

}
