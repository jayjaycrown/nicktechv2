
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  key = 'name';
  reverse = false;
  p = 1;
  histories: any = []
  newHistories: any;
  transactionNo: string;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform,
  ) {

  }

  search() {
    this.newHistories = this.histories;
    if (this.transactionNo === '') {
      this.newHistories = this.histories;
    } else {
      this.newHistories = this.newHistories.filter((res) => {
        return String(res.transactionNo)
          .toLocaleLowerCase()
          .match(this.transactionNo.toLocaleLowerCase());
      });
    }
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getTransactions();
  }

  async getTransactions() {
    const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'bubbles'
      });
    await loading.present();
    this.auth.getTransactionHistories().subscribe(async res => {
      await loading.dismiss();
      //console.log(res);
      this.histories = res;
      this.newHistories = this.histories
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
