import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
      this.saveToken(obj['token']);
      this.router.navigateByUrl('/');
    });
    console.log(res);
  }

  test() {
    this.http.get('/api/auth/check').subscribe((res) => {
      console.log(res);
    });
  }

  saveToken(token: Object) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  isAuthenticate(): boolean {
    let token = localStorage.getItem('token');
    console.log('token', token);
    if (token != null) {
      if (token.length > 2) {
        return true;
      }
    }
    return false;
  }
}
