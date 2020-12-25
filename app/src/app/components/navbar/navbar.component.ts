import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../../service/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    console.group('TODO');
    console.log('COMPROBAR SI ESTA LOGEADO PARA MOSTRAR EL NAVBAR');
    console.log('LOGEDIN OSBERVABLE ?');
    console.log('STORE LOGGEIN ?');
    console.groupEnd();
  }
  click() {
    console.log('send');
  }
}
