import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, Categorie, SousCategorie, CentreInteret } from '../models/article';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getArticles(sousCategorieId?: number, searchTerm?: string): Observable<Article[]> {
    let params = new HttpParams();
    
    if (sousCategorieId) {
      params = params.set('sous_categorie', sousCategorieId.toString());
    }
    
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<Article[]>(`${this.apiUrl}/article/`, { params });
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/article/${id}/`);
  }

  getSousCategories(): Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>(`${this.apiUrl}/article/?sous-categorie/`);
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categorie/`);
  }

  getCentresInteret(): Observable<CentreInteret[]> {
    return this.http.get<CentreInteret[]>(`${this.apiUrl}/centres-interet/`);
  }

  likeArticle(articleId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/articles/${articleId}/like/`, {});
  }
}