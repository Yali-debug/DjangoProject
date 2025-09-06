import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, LoginData, AuthResponse, RegisterData} from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = environment.apiURL;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isNewUserSubject = new BehaviorSubject<boolean>(false);
  public isNewUser$ = this.isNewUserSubject.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadToken();
  }

  login(credentials: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/token/`, credentials).pipe(
      tap(response => {
        this.setToken(response.access);
        // Charger les informations utilisateur après le login
        this.loadUserInfo();
      })
    );
  }

  register(userData: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, userData).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.loadUserInfo();
          this.markAsNewUser(); // Marquer comme nouvel utilisateur
        } else if (response.access) {
          this.setToken(response.access);
          this.loadUserInfo();
          this.markAsNewUser(); /// Marquer comme nouvel utilisateur
        }
      })
    );
  }
  
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): number | null {
    return this.currentUserSubject.value?.id || null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private loadToken(): void {
    const token = this.getToken();
    if (token && this.isAuthenticated()) {
      this.loadUserInfo();
    }
  }

  private loadUserInfo(): void {
    // Implémentez cette méthode pour charger les informations utilisateur
    // depuis votre API après l'authentification
    this.http.get<User>(`${this.apiUrl}/utilisateur/`).subscribe({
      next: (user) => {
        this.currentUserSubject.next(user);
      },
      error: (error) => {
        console.error('Error loading user info:', error);
        this.logout();
      }
    });
  }

  completeOnboarding(): void {
    this.isNewUserSubject.next(false);
  }

  // Méthode pour vérifier si c'est un nouvel utilisateur
  isNewUser(): boolean {
    return this.isNewUserSubject.value;
  }

  // Méthode pour marquer comme nouvel utilisateur
  markAsNewUser(): void {
    this.isNewUserSubject.next(true);
  }






  
}
