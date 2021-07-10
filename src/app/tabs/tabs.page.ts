import { Component, ViewChild } from '@angular/core';
import { AlertController, IonTabs, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selectedTab: string;
  showLabel: boolean;
  constructor(
    private platform: Platform,
    private _location: Location,
    public alertController: AlertController
  ) {
    // this.checkHome()
    this.platform.backButton.subscribeWithPriority(-1, (processNextHandler) => {
      console.log('Back press handler!');
      // alert('Back press handler');
      // alert(this._location.path());
      if (this._location.isCurrentPathEqualTo('/home/dashboard')) {
        // Show Exit Alert!
        // alert('Show Exit Alert!');
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {
        // Navigate to back page
        // alert('Navigate to back page');
        console.log('Navigate to back page');
        this._location.back();
      }
    });

  }

  showExitConfirm() {
    this.alertController
      .create({
        header: 'App termination',
        message: 'Do you want to close the app?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Stay',
            role: 'cancel',
            handler: () => {
              console.log('Application exit prevented!');
            },
          },
          {
            text: 'Exit',
            handler: () => {
              navigator['app'].exitApp();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  // ionViewWillEnter() {
  //   this.checkHome()
  // }

  // checkHome() {
  //   // // document.querySelector('body').classList.add('dark')
  //   // const data2 = document.querySelector('ion-tab-button').classList.contains('home');
  //   // const data = document.querySelector('ion-tab-button').classList.contains('tab-selected');
  //   // console.log(data)
  //   // console.log(data2);
  //   // if () {

  //   // } else {

  //   // }
  // }

  // tab-selected

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
    // console.log(this.selectedTab);
    if (this.selectedTab == 'dashboard') {
      this.showLabel = false;
    }else this.showLabel = true;
  }
}
