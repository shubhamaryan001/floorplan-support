import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const BASEURL = "https://nodelatest-api.herokuapp.com/api";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(body): Observable<any> {
    return this.http.post(`${BASEURL}/signin`, body);
  }
}
