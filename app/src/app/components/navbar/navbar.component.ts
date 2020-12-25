import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { AuthenticationService } from './../../service/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    console.log(this.auth.isLoggedIn());
    console.group('TODO');
    console.log('COMPROBAR SI ESTA LOGEADO PARA MOSTRAR EL NAVBAR');
    console.log('LOGEDIN OSBERVABLE ?');
    console.log('STORE LOGGEIN ?');
    console.groupEnd();
  }
  ngOnChanges() {
    console.log('ngOnChanges', this.auth.isLoggedIn());
  }
  ngAfterContentInit() {
    console.log('ngAfterContentInit', this.auth.isLoggedIn());
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked', this.auth.isLoggedIn());
    this.isLoggedIn = this.auth.isLoggedIn();
  }
  logout() {
    this.isLoggedIn = false;
    this.auth.logout();
  }
}
