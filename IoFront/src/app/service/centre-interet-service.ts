import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap} from 'rxjs';
import { CentreInteret } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class centreInteretService {
  private apiUrl = environment.apiURL;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getCentresInteret(): Observable<CentreInteret[]> {
    return this.http.get<CentreInteret[]>(`${this.apiUrl}/centre_interet/`);
  }

  saveAbonnements(centreIds: number[]): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    
    if (!userId) {
      return of(null); // Retourner un Observable vide si l'utilisateur n'est pas connecté
    }
    
    const abonnements = centreIds.map(centreId => ({
      utilisateur: userId,
      centre_interet: centreId
    }));
    
    return this.http.post(`${this.apiUrl}/abonnements/mass_create/`, {
      abonnements
    });
  }
  
}
