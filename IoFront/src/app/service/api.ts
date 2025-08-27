import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from './article';
// Configuration Swiper
import { SwiperOptions } from 'swiper/types'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api'; //  URL API

  //configuration Swiper pour les articles
   // Configuration Swiper pour les articles
  swiperConfig: SwiperOptions = {
    slidesPerView: 1.2,
    spaceBetween: 16,
    centeredSlides: false,
    breakpoints: {
      640: { slidesPerView: 2.2, spaceBetween: 20 },
      768: { slidesPerView: 2.5, spaceBetween: 24 },
      1024: { slidesPerView: 3.2, spaceBetween: 28 }
    },
    pagination: { 
      clickable: true,
      type: 'bullets'
    },
    navigation: true
  };

  // Configuration Swiper pour les articles en vedette
  featuredSwiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'fade',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      }
    },
    loop: true
  };


  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/article/`).pipe(
      map((response: any) => response.results || response)
    );
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/article/${id}/`);
  }

  getFeaturedArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles/?featured=true`);
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