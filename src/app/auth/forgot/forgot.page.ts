import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../_services/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  forgotForm: FormGroup;
  // loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  showPass = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.required, Validators.email])],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get f() {
    return this.forgotForm.controls;
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'bubbles'
      });
      await loading.present();
    this.submitted = true;
    // console.log(this.loginForm);

    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }

    // this.loading = true;
    this.authenticationService
      .forgot(this.f.email.value)
      .pipe(first())
      .subscribe(
        async (data) => {
          // console.log(data)
          const message = data;
          this.presentToast(message, 'success');
          await loading.dismiss();
          // this.router.navigate([this.returnUrl]);
        },
        async (error) => {
          await loading.dismiss();
          const message = error;
          this.presentToast(message, 'danger');
          // this.loading = false;
        }
      );
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

