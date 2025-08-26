import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from './article';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';  //  URL API

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/article/`).pipe(
      map((response: any) => response.results || response)
    );
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/article/${id}/`);
  }

  createArticle(article: Partial<Article>): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/article/`, article);
  }

  updateArticle(id: number, article: Partial<Article>): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/article/${id}/`, article);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/article/${id}/`);
  }
}