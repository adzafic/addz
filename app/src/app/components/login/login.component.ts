import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../service/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.auth.isAuthenticate();
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [
          /*Validators.required /* Validators.pattern(this.emailRegx)*/
        ],
      ],
      password: [null /*Validators.required*/],
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    let { email, password } = this.loginForm.value;
    this.auth.login(email, password);
    console.log(this.loginForm.value);
  }
}
