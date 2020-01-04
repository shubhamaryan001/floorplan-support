import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

const BASEURL = "https://nodelatest-api.herokuapp.com/api";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  SetToken(token) {
    this.cookieService.set("chat_token", token);
  }

  GetToken() {
    return this.cookieService.get("chat_token");
  }

  DeleteToken() {
    this.cookieService.delete("chat_token");
  }

  authenticate = data => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
    }
  };

  isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };

  GetUserInfo() {
    const token = this.isAuthenticated();
    let payload;
    if (token) {
      payload = JSON.parse(localStorage.getItem("jwt"));
    }

    return payload;
  }

  signout = next => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      next();
      return fetch(`${BASEURL}/signout`, {
        method: "GET"
      })
        .then(response => {
          console.log("signout", response);
        })
        .catch(err => console.log(err));
    }
  };

  GetPayload() {
    const token = this.GetToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = JSON.parse(window.atob(payload));
    }

    return payload;
  }
}
