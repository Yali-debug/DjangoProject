import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../service/article-service';
import { AuthService } from '../service/auth-service';
import { LoadingController, ToastController } from '@ionic/angular';
import { SousCategorie } from '../models/article';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  articles: Article[] = [];
  sousCategories: SousCategorie[] = [];
  
  selectedArticle: Article | null = null;
  isArticleDetailVisible = false;
  isLoading = false;
  searchTerm = '';

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.loadInitialData();
    await this.loadArticles();
  }

  async loadInitialData() {
    try {
      this.sousCategories = await this.articleService.getSousCategories().toPromise() || [];
    } catch (error) {
      console.error('Error loading filter data:', error);
      this.showToast('Erreur lors du chargement des filtres');
    }
  }

  async loadArticles() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Chargement des articles...'
    });
    await loading.present();

    try {
      this.articleService.getArticles(undefined, this.searchTerm).subscribe({
        next: (articles) => {
          this.articles = articles;
          loading.dismiss();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading articles:', error);
          loading.dismiss();
          this.isLoading = false;
          this.showToast('Erreur lors du chargement des articles');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      loading.dismiss();
      this.isLoading = false;
    }
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.loadArticles();
  }

  showArticleDetail(article: Article) {
    this.selectedArticle = article;
    this.isArticleDetailVisible = true;
  }

  hideArticleDetail() {
    this.isArticleDetailVisible = false;
    this.selectedArticle = null;
  }

  async logout() {
    await this.authService.logout();
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}