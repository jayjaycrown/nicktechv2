import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  status: any;
  currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(data) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/sign-up`, data)
      .pipe();
  }
  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          const token = user.token;
          if (token !== undefined) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  forgot(email: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/forgot-password`, { email })
      .pipe();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/auth');
  }

  getProfile() {
    return this.http.get<any>(`${environment.apiUrl}/api/profile`).pipe();
  }

  dashboard() {
    return this.http.get<any>(`${environment.apiUrl}/auth/dashboard`).pipe();
  }

  updateProfile(phone: number) {
    return this.http
      .patch<any>(`${environment.apiUrl}/api/update-user-profile`, { phone })
      .pipe();
  }

  verifyBvn(bvn: number) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/verify-bvn`, { bvn })
      .pipe();
  }

  // Wallet Details

  getWalletDetails() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/my-wallet-details`)
      .pipe();
  }

  createAcNo() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/create-account-number`)
      .pipe();
  }
  getAcNo() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/my-account-number`)
      .pipe();
  }

  fundWallet(amount: number) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/fund-wallet`, { amount })
      .pipe();
  }

  // Referral Details

  getrefDetails(refLink) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/get-user-referral-details`, {
        refLink,
      })
      .pipe();
  }

  createRefLink() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/create-new-link`)
      .pipe();
  }

  getRefLink() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/referral-Details`)
      .pipe();
  }

  getDownliners() {
    return this.http.get<any>(`${environment.apiUrl}/api/my-downliners`).pipe();
  }

  // Transaction histories

  getTransactionHistories() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/my-transactions`)
      .pipe();
  }

  // Tickets

  createTicket(data: { msgTitle: any; msgPriority: any; msgDescription: any }) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/create-ticket`, data)
      .pipe();
  }

  getTickets() {
    return this.http.get<any>(`${environment.apiUrl}/api/my-tickets`).pipe();
  }

  // Begin Data Purchase

  mtnPrice() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/mtn-data-price`)
      .pipe();
  }

  mtnGiftingPrice() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/data-gifting-rate-mtn`)
      .pipe();
  }

  gloPrice() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/glo-data-price`)
      .pipe();
  }

  airtelPrice() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/airtel-data-price`)
      .pipe();
  }

  mobilePrice() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/9mobile-data-price`)
      .pipe();
  }

  buyDataMtn(data) {
    // console.log(data);
    return this.http
      .post<any>(`${environment.apiUrl}/api//buy-data-mtn`, data)
      .pipe();
  }
  buyDataAirtel(data) {
    return this.http
      .post<any>(`${environment.apiUrl}/api//buy-data-airtel`, data)
      .pipe();
  }
  buyEtisalatData(data) {
    return this.http
      .post<any>(`${environment.apiUrl}/api//buy-data-9mobile`, data)
      .pipe();
  }
  buyGloData(data) {
    return this.http
      .post<any>(`${environment.apiUrl}/api//buy-data-glo`, data)
      .pipe();
  }

  // End Data Purchase

  // Begin Airtime Purchase

  mtnAirtimeSandSPrice() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/mtn-airtime-rate-shareAndSell`)
      .pipe();
  }

  mtnVTUPrice() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/mtn-airtime-rate-vtu`)
      .pipe();
  }

  airtelVTUPrice() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/airtel-airtime-rate`)
      .pipe();
  }
  gloVTUPrice() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/glo-airtime-rate`)
      .pipe();
  }
  etisalatVTUPrice() {
    return this.http
      .get<any>(`${environment.apiUrl}/api/mobile9-airtime-rate`)
      .pipe();
  }

  buyMtnAirtime(data) {
    // console.log(data)
    return this.http
      .post<any>(`${environment.apiUrl}/api/buy-airtime-mtn`, data)
      .pipe();
  }
  buyAirtelAirtime(data) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/buy-airtime-airtel`, data)
      .pipe();
  }
  buyGloAirtime(data) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/buy-airtime-glo`, data)
      .pipe();
  }
  buyEtisalatAirtime(data) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/buy-airtime-9mobile`, data)
      .pipe();
  }

  // End Airtime Purchase

  // Convert Airtime2Cash

  convert(data) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/airtime-to-cash`, data)
      .pipe();
  }

  async getStatus() {
    // localStorage.setItem('currentUser', JSON.stringify(user));
    const test = localStorage.getItem('test-key');
    // const test = await Storage.get({ key: another_Key });
    this.status = test;
    // alert(this.status)
    // if (this.status === null) {
    //   this.status = false
    // }
    if (this.status === 'false') {
      document.querySelector('body').classList.remove('dark');
      // document.body.className.replace('nil', 'dark');
      // console.log(document.body.className)
    }
    if (this.status === 'true') {
      document.querySelector('body').classList.add('dark');
      // console.log(document.body.className)
    }
  }
}
