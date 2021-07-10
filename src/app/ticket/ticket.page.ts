import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../_services/authentication.service';

import { ModalController } from '@ionic/angular';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  key = 'name';
  reverse = false;
  p = 1;
  createdTickets: any = [];
  newcreatedTickets: any = [];
  ticketId: string;
  constructor(
    private modalController: ModalController,
    private router: Router,
    private auth: AuthenticationService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform,
  ) {

  }

  search() {
    this.newcreatedTickets = this.createdTickets;
    if (this.ticketId === '') {
      this.newcreatedTickets = this.createdTickets;
    } else {
      this.newcreatedTickets = this.newcreatedTickets.filter((res) => {
        return String(res.ticketId)
          .toLocaleLowerCase()
          .match(this.ticketId.toLocaleLowerCase());
      });
    }
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'bubbles'
      });
    await loading.present();
    this.getTickets();
    await loading.dismiss()
  }

  ionViewWillEnter() {
    this.getTickets();
  }

  async createTicket() {
    const modal = await this.modalController.create({
    component: CreateComponent,
    componentProps: { value: 123 }
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      this.getTickets();
    });
  }

  async getTickets() {
    this.auth.getTickets().subscribe(async res => {
      //console.log(res)
      this.createdTickets = res;
      this.newcreatedTickets = this.createdTickets;

    }, async err => {
      this.presentToast(err, 'danger');
    })
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    await toast.present();
  }

}
