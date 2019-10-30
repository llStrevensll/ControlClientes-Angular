import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  password: string;

  constructor(private router: Router,
              private flashMessages: FlashMessagesService,
              private loginService: LoginService
              
  ) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }
  
  login(){
    this.loginService.login(this.email, this.password)
      .then(res => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger', timeout: 400
        });
      });
  }
}
