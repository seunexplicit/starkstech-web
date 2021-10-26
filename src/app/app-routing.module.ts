import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { EventComponent } from './pages/to-do/event/event.component';
import { ToDoComponent } from './pages/to-do/to-do.component';
import { ToDoComponent as ToDoChild } from './pages/to-do/to-do/to-do.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/',
    pathMatch:'full'
  },
  {
    path: 'home',
    redirectTo: 'home/',
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    component: ToDoComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'event',
        component: EventComponent,
      },
      {
        path: '',
        component: ToDoChild
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
