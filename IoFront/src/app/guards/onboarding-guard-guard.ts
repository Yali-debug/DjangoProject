import { CanActivateFn, Router } from '@angular/router';  
import { inject } from '@angular/core';
import { AuthService } from '../service/auth-service';

export const onboardingGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
   // Vérifier si l'utilisateur est un nouvel utilisateur
  if (authService.isNewUser()) {
    return true;
  } else {
    // Rediriger vers la page d'accueil si ce n'est pas un nouvel utilisateur
    router.navigate(['/home']);
    return false;
  }
};
