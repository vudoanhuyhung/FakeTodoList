import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { TodoListComponent } from './features/todo/todo-list/todo-list.component';
//import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'todos',
    component: TodoListComponent,
    //canActivate: [authGuard] // Protect this route
  },
  // Redirects
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'todos'
  } // Catch-all
];
