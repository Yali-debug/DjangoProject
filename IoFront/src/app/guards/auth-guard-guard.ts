import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifier si l'utilisateur est authentifié
  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Rediriger vers la page de login si non authentifié
    router.navigate(['/login']);
    return false;
  }
};
