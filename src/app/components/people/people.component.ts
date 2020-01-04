import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  users: [];
  token: any;
  show:any;
  showAdmin=false;
  showUsers= false;
  admins: [];
  constructor(private usersServices: UsersService,private tokenService:TokenService,private router:Router) { }

  ngOnInit() {

    this.token = this.tokenService.GetUserInfo().token;
    this.show = this.tokenService.GetUserInfo().user.role;
    this.GetUsers();
    this.GetAdminUsers();

  this.GetAdminShow();
this.GetUserShow();



  }



  GetAdminShow(){

    if(this.show === 1){

      console.log(this.show);
      this.showAdmin=true;


    }
  }



  GetUserShow(){

    if(this.show === 0){

      console.log(this.show);
      this.showUsers=true;


    }
  }





  GetUsers() {





    this.usersServices.GetAllUsers(this.token).then(data => {
console.log(data)
      this.users = data.result;

});


  }


  GetAdminUsers() {

    this.usersServices.GetAllAdmin(this.token).then(data => {
      console.log(data)
            this.admins = data.result;

      });


  }







}
