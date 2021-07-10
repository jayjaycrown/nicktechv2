import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  loginForm: FormGroup;
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

  ionViewWillEnter() {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get f() {
    return this.loginForm.controls;
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
    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        async (data) => {
          // console.log(data)
          const message = 'Login Successful';
          this.presentToast(message, 'success');
          await loading.dismiss();
          this.router.navigate([this.returnUrl]);
        },
        async (error) => {
          await loading.dismiss();
          const message = `Login Failed...`;
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
