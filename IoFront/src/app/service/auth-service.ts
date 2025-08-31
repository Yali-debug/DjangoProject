import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, LoginData, AuthResponse, RegisterData} from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiURL;
  private tokenKey = 'access-token';
  private refreshTokenKey = 'refresh-token';
  private currentUser = new BehaviorSubject<User | null> (null);
  
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor (
    private http: HttpClient,
    private storage : Storage,
    private router: Router
  ) {
    this.initStorage();
  }

  async initStorage () {
    await this.storage.create();
    await this.loadStoredToken();
  }

  private async loadStoredToken() {
    const token = await this.getAccessToken();
    if (token) {
      // CORRECTION : Utiliser la variable token correctement
      this.isAuthenticated.next(!!token);
      await this.loadUserProfile();
    } else {
      this.isAuthenticated.next(false);
    }
  }



  login(credentials: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/token/`, credentials).pipe(
      tap(async (response: AuthResponse) => {
        await this.storage.set(this.tokenKey, response.access);
        await this.storage.set(this.refreshTokenKey, response.refresh);
        await this.loadUserProfile();
        this.isAuthenticated.next(true);
      })
    );
  }

  register(userData: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, userData);
  }

  async loadUserProfile(): Promise<void> {
    try {
      // Utilisez toPromise() avec await et vérifiez le résultat
      const userProfile = await this.http.get<User>(`${this.apiUrl}/utilisateur/me/`).toPromise();
      
      // Vérification explicite pour éviter undefined
      if (userProfile) {
        this.currentUser.next(userProfile);
      } else {
        console.error('User profile is undefined');
        this.currentUser.next(null);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      this.currentUser.next(null); // Explicitement mettre à null
      await this.logout();
    }
  }

  async getAccessToken(): Promise<string | null> {
    return await this.storage.get(this.tokenKey);
  }

  async getRefreshToken(): Promise<string | null> {
    return await this.storage.get(this.refreshTokenKey);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  async logout(): Promise<void> {
    await this.storage.remove(this.tokenKey);
    await this.storage.remove(this.refreshTokenKey);
    this.currentUser.next(null);
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }
  
  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }


  async refreshToken(): Promise<string | null> {
    const refreshToken = await this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response: any = await this.http.post(`${this.apiUrl}/token/refresh/`, {
        refresh: refreshToken
      }).toPromise();

      await this.storage.set('access_token', response.access);
      return response.access;
    } catch (error) {
      await this.logout();
      return null;
    }
  }

   // Méthode utilitaire pour vérifier l'état d'authentification (synchrone)
  isAuthenticatedSync(): boolean {
    return this.isAuthenticated.value;
  }
}
