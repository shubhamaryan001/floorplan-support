import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";
import { Router } from "@angular/router";

const API = "https://nodelatest-api.herokuapp.com/api";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  user: any;
  photoUrl: any;
  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit() {
    this.user = this.tokenService.GetUserInfo().user;
    console.log(this.tokenService.GetUserInfo());

    this.photoUrl = this.user._id
      ? `${API}/user/photo/${this.user._id}?${new Date().getTime()}`
      : "";
  }

  ChatPage() {
    this.router.navigate(["people"]);
  }
}
