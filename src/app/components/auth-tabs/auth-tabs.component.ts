import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css']
})
export class AuthTabsComponent implements OnInit {
  errorMessage: string;
  loginForm: FormGroup;
  showSpinner = false;

  constructor( private fb: FormBuilder
,    private authService:AuthService,private router:Router,private tokenService:TokenService) { }

ngOnInit() {
  this.init();

  const token = this.tokenService.GetToken();
  if (token) {
    this.router.navigate(['users']);
  } else {
    this.router.navigate(['']);
  }
}

init() {
  this.loginForm = this.fb.group({
    email: ['saurabharyan30@gmail.com', Validators.required],
    password: ['intex472', Validators.required]
  });
}

  loginUser() {
    this.showSpinner = true;

    this.authService.loginUser(this.loginForm.value).subscribe(


      data => {

        this.tokenService.authenticate(data);
        this.tokenService.SetToken(data.token);
        this.loginForm.reset();
        setTimeout(() => {
          this.router.navigate(['users']);
        }, 500);


    }, err => {
      this.showSpinner = false;

      if (err.error.error) {
        this.errorMessage = err.error.error;
      }
    })
  }
}
