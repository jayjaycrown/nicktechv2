import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/_services/authentication.service';
import { Location } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private displayMode: AuthenticationService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private _location: Location,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.displayMode.getStatus();
      if (this.platform.is('android')){
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#12abe9');
      this.splashScreen.hide();
    }
    })


    // this.platform.backButton.subscribeWithPriority(5, (processNextHandler) => {
    //   console.log('Back press handler!');
    //   // alert('Back press handler')
    //   if (this._location.isCurrentPathEqualTo('/home/dashboard')) {

    //     // Show Exit Alert!
    //     // alert('Show Exit Alert!')
    //     console.log('Show Exit Alert!');
    //     this.showExitConfirm();
    //     processNextHandler();
    //   } else {
    //     // Navigate to back page
    //     // alert('Navigate to back page')
    //     console.log('Navigate to back page');
    //     this._location.back();

    //   }

    // });

  }

  // showExitConfirm() {
  //   this.alertController.create({
  //     header: 'App termination',
  //     message: 'Do you want to close the app?',
  //     backdropDismiss: false,
  //     buttons: [{
  //       text: 'Stay',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Application exit prevented!');
  //       }
  //     }, {
  //       text: 'Exit',
  //       handler: () => {
  //         navigator['app'].exitApp();
  //       }
  //     }]
  //   })
  //     .then(alert => {
  //       alert.present();
  //     });
  // }
}
