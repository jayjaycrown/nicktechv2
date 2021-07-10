import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../_services/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  page1: boolean;
  page2: boolean;
  showPass = false;
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
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
    this.page1 = true;
    this.page2 = false;
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.required,
          Validators.email,
        ]),
      ],
      fullName: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required,
        ]),
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(6),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
      whatsapp: [
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(6),
          Validators.pattern('[0-9]*'),
        ]),
      ],
      accountType: ['', Validators.required],
      referee: [{value: 'Admin', disabled: true}],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });

    // get return url from route parameters or default to '/'
  }

  next() {
    this.page1 = false;
    this.page2 = true;
  }
  back() {
    this.page1 = true;
    this.page2 = false;
  }

  get f() {
    return this.registerForm.controls;
  }

    async onSubmit() {
    const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'bubbles'
      });
      await loading.present();
    this.submitted = true;
    console.log(this.registerForm.value);

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // this.loading = true;
      // email, fullName,phoneNumber,whatsapp,accountType,referee
      const obj = {
        email: this.f.email.value,
        fullName: this.f.fullName.value,
        phoneNumber: this.f.phoneNumber.value,
        whatsapp:this.f.whatsapp.value,
        accountType:this.f.accountType.value,
        referee: this.f.referee.value,
        password: this.f.password.value,
      }
      this.authenticationService
      .register(obj)
      .pipe(first())
      .subscribe(
        async (data) => {
          console.log(data)
          const message = 'Registration Successful';
          this.presentToast(message, 'success');
          await loading.dismiss();
          this.router.navigate(['/auth']);
        },
        async (error) => {
          await loading.dismiss();
          const message = `Registration Failed... <br/> ${error}`;
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
