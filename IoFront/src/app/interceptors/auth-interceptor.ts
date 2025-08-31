import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { Observable, switchMap, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
  constructor (
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/token') || req.url.includes('/register')) {
      return next.handle(req);
    }

    return from(this.authService.getAccessToken()).pipe(
      switchMap(token => {
        if(token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}` // Correction ici
            }
          });
        }
        return next.handle(req);
      })
    );
    
  }
  
}
