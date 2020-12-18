import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const headers = { 'Content-Type': 'application/json' };
    this.http
      .post(
        'api/auth/login',
        {
          email,
          password,
        },
        { headers }
      )
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
