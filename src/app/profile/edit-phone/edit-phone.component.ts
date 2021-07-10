import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.scss'],
})
export class EditPhoneComponent implements OnInit {
  updateForm: FormGroup;
  // loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      phone: [
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(6),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
    });

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get f() {
    return this.updateForm.controls;
  }
  close() {
    this.modalController.dismiss();
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
    if (this.updateForm.invalid) {
      return;
    }

    // this.loading = true;
    this.authenticationService
      .updateProfile(this.f.phone.value)
      .pipe(first())
      .subscribe(
        async (data) => {
          // console.log(data)
          const message = data;
          this.presentToast(message, 'success');
          await loading.dismiss();

          this.close();
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
