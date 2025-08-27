import { Component, OnInit } from '@angular/core';
import { Article } from '../service/article';
import { ApiService } from '../service/api';
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false // ← Si vous utilisez des composants standalone
})
export class HomePage implements OnInit {
  articles: Article[] = [];
  isLoading = true;
  selectedArticle: Article | null = null;
  viewMode: 'list' | 'detail' = 'list';


  constructor(private articleService: ApiService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.isLoading = true;
    this.articleService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des articles:', error);
        this.isLoading = false;
      }
    });
  }

  doRefresh(event: any) {
    this.articleService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        event.target.complete();
      },
      error: (error) => {
        console.error('Erreur:', error);
        event.target.complete();
      }
    });
  }

    // Afficher les détails d'un article
  showArticleDetail(articleId: number) {
    this.isLoading = true;
    this.articleService.getArticle(articleId).subscribe({
      next: (article) => {
        this.selectedArticle = article;
        this.viewMode = 'detail';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'article:', error);
        this.isLoading = false;
      }
    });
  }

    // Retour à la liste
  backToList() {
    this.selectedArticle = null;
    this.viewMode = 'list';
  }
}