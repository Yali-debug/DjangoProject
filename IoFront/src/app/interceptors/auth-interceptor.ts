import { HttpEvent, HttpHandler, HttpErrorResponse, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { Observable, switchMap, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
  
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Ajouter le token aux requêtes qui nécessitent une authentification
    const authReq = this.addAuthHeader(request);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.authService.isAuthenticated()) {
          // Token expiré, tenter de rafraîchir
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    // Ne pas ajouter le token pour les routes publiques
    if (this.isPublicRoute(request.url)) {
      return request;
    }

    const token = this.authService.getToken();
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  private isPublicRoute(url: string): boolean {
    const publicRoutes = [
      `${this.authService.apiUrl}/token/`,
      `${this.authService.apiUrl}/register/`,
      `${this.authService.apiUrl}/centre_interet/`,
      `${this.authService.apiUrl}/categorie/`,
      `${this.authService.apiUrl}/sous_categorie/`,
      `${this.authService.apiUrl}/article/`
    ];

    return publicRoutes.some(route => url.includes(route));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // Implémenter la logique de rafraîchissement du token si nécessaire
      // Pour l'instant, on déconnecte simplement l'utilisateur
      this.authService.logout();
      
      return throwError(() => new Error('Session expirée. Veuillez vous reconnecter.'));
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(() => next.handle(this.addAuthHeader(request)))
    );
  }
}
