import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { UsersComponent } from '../components/users/users.component';
import { PeopleComponent } from '../components/people/people.component';
import { AuthGuard } from '../services/auth.guard';
import { ChatComponent } from '../components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: AuthTabsComponent
  },

  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate:[AuthGuard]
  }, {
    path: 'chat/:name',
    component: ChatComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'users'
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})





export class AuthRoutingModule { }
