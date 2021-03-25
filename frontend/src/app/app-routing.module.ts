import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SesionComponent } from './components/sesion/sesion.component';
import { AuthGuard } from './seguridad/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // { path: '**', 
  //   component: PageNotFoundComponent 
  // },
  {
    path: 'login',
    component: SesionComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
];

lazy loading 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
