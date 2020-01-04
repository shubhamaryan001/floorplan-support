import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  user: any;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.user = this.tokenService.GetUserInfo().user;
    console.log(this.tokenService.GetUserInfo());
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.tokenService.signout(() => {
      this.tokenService.DeleteToken();
      this.router.navigate(['']);

    })


  }
}
