import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  async login(email: string, password: string) {
    let res = await this.http.post('/api/auth/login', {
      email,
      password,
    });
    res.subscribe((token) => this.saveToken(token));
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
}
