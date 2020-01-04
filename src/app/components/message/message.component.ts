import { Component, OnInit, AfterViewInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";
import { MessageService } from "src/app/services/message.service";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import io from "socket.io-client";
const API = "https://nodelatest-api.herokuapp.com/api";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit, AfterViewInit {
  receiver: string;
  token: any;
  user: any;
  senderPostId: any;
  message: string;
  receiverData: any;
  messageData: any;
  senderName: any;
  receiverName: any;
  messagesArray = [];
  socket: any;
  typingMessage;
  typing = false;
  photoUrl: any;

  constructor(
    private tokenService: TokenService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.socket = io("https://nameless-escarpment-33559.herokuapp.com");
  }

  ngOnInit() {
    this.user = this.tokenService.GetUserInfo().user;
    this.senderPostId = this.tokenService.GetUserInfo().user._id;
    this.senderName = this.tokenService.GetUserInfo().user.name;
    console.log(this.senderName);

    this.token = this.tokenService.GetUserInfo().token;

    this.route.params.subscribe(params => {
      this.receiver = params.name;
      this.GetUserByName(this.receiver);

      this.socket.on("refreshPage", () => {
        this.GetUserByName(this.receiver);
      });
    });

    this.socket.on("is_typing", data => {
      if (data.sender === this.receiver) {
        this.typing = true;
      }
    });

    this.socket.on("has_stopped_typing", data => {
      if (data.sender === this.receiver) {
        this.typing = false;
      }
    });
  }

  ngAfterViewInit() {
    const params = {
      room1: this.user.name,
      room2: this.receiver
    };

    this.socket.emit("join chat", params);
  }

  GetUserByName(name) {
    this.usersService.GetUserByName(name, this.token).then(data => {
      this.receiverData = data.result._id;
      this.receiverName = data.result.name;
      this.GetMessages(this.senderPostId, data.result._id);
      this.photoUrl = this.receiverData
        ? `${API}/user/photo/${this.receiverData}?${new Date().getTime()}`
        : "";
    });
  }

  GetMessages(senderId, receiverId) {
    this.msgService
      .GetAllMessages(this.token, senderId, receiverId)
      .then(data => {
        this.messagesArray = data.messages.message;
        console.log(this.messagesArray);
      });
  }

  SendMessage() {
    if (this.message) {
      this.msgService
        .SendMessage(
          this.token,
          this.senderPostId,
          this.senderName,
          this.receiverData,
          this.receiverName,
          this.message
        )
        .then(data => {
          this.socket.emit("refresh", {});
          this.message = "";
        });
    }
  }

  IsTyping() {
    this.socket.emit("start_typing", {
      sender: this.user.name,
      receiver: this.receiver
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit("stop_typing", {
        sender: this.user.name,
        receiver: this.receiver
      });
    }, 500);
  }
}
