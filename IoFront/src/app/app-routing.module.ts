import { authGuardGuard } from './guards/auth-guard-guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { onboardingGuardGuard } from './guards/onboarding-guard-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
     canActivate: [authGuardGuard]
  },
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full'
  },
  {
    path: 'login-page',
    loadChildren: () => import('./pages/login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  },
  {
    path: 'centres-interet',
    loadChildren: () => import('./pages/centres-interet/centres-interet.module').then( m => m.CentresInteretPageModule),
    canActivate: [authGuardGuard, onboardingGuardGuard]
  },
  {
    path: 'centres-interet',
    loadChildren: () => import('./pages/centres-interet/centres-interet.module').then( m => m.CentresInteretPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
