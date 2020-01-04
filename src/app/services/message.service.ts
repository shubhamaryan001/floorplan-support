import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const BASEURL = "https://nodelatest-api.herokuapp.com/api";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  constructor(private http: HttpClient) {}

  // SendMessage(senderId, receiverId, receiverName, message): Observable<any> {
  //   return this.http.post(`${BASEURL}/chat-messages/${senderId}/${receiverId}`, {
  //      receiverId,
  //     receiverName,
  //     message
  //   });
  // }

  SendMessage = (
    token,
    senderId,
    senderName,
    receiverId,
    receiverName,
    message
  ) => {
    return fetch(`${BASEURL}/chat-messages/${senderId}/${receiverId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        token,
        senderId,
        senderName,
        receiverId,
        receiverName,
        message
      })
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };

  GetAllMessages = (token, senderId, receiverId) => {
    return fetch(`${BASEURL}/chat-messages/${senderId}/${receiverId}`, {
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

  // GetAllMessages(senderId, receiverId): Observable<any> {
  //   return this.http.get(`${BASEURL}/chat-messages/${senderId}/${receiverId}`);
  // }
}
