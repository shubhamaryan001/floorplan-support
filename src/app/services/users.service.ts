import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

const BASEURL = "https://nodelatest-api.herokuapp.com/api";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // GetAllUsers(token): Observable<any> {
  //   return this.http.get(`${BASEURL}/users`);

  // }

  GetAllUsers = token => {
    return fetch(`${BASEURL}/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  GetAllAdmin = token => {
    return fetch(`${BASEURL}/adminusers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  GetUserByName = (name, token) => {
    return fetch(`${BASEURL}/name/${name}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
}
