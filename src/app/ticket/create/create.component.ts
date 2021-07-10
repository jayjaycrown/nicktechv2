import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  createTicketForm: FormGroup;
  // loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private modalController: ModalController,
    private auth: AuthenticationService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createTicketForm = this.formBuilder.group({
      msgTitle: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      msgPriority: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      msgDescription: ['', Validators.compose([Validators.maxLength(150), Validators.required])],
    });
  }
  get f() {
    return this.createTicketForm.controls;
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
    if (this.createTicketForm.invalid) {
      return;
    }
    const obj = {
      msgTitle: this.f.msgTitle.value,
      msgPriority: this.f.msgPriority.value,
      msgDescription: this.f.msgDescription.value
    }
    this.auth
      .createTicket(obj)
      .pipe(first())
      .subscribe(
        async (data) => {
          // console.log(data)
          const message = data;
          this.presentToast(message, 'success');
          await loading.dismiss();
          this.click();
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

  click() {
    this.modalController.dismiss({

    })
  }
}
