import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  async login(email: string, password: string) {
    let res = await this.http.post('/api/auth/login', {
      email,
      password,
    });
    res.subscribe((obj) => {
      this.saveToken(obj);
      this.router.navigateByUrl('/');
    });
  }

  test() {
    this.http.get('/api/auth/check').subscribe((res) => {
      console.log(res);
    });
  }

  saveToken(token: Object) {
    const expiresAt = moment().add(token['expiresIn'], 'second');
    localStorage.setItem('token', JSON.stringify(token['token']));
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
}
