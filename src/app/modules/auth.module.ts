import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthTabsComponent } from './../components/auth-tabs/auth-tabs.component';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from '../components/users/users.component';
import { PeopleComponent } from '../components/people/people.component';
import { UsersService } from '../services/users.service';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';

import { AuthRoutingModule } from './auth-routing.module';
import { MessageService } from '../services/message.service';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [AuthTabsComponent,UsersComponent,PeopleComponent, ChatComponent, MessageComponent],
  imports: [
    CommonModule,HttpClientModule,FormsModule, ReactiveFormsModule,AuthRoutingModule,NgxAutoScrollModule,MomentModule
  ],
  exports: [AuthTabsComponent],
providers:[AuthService,UsersService,MessageService]
})
export class AuthModule { }
