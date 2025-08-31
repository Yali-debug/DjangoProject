import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../models/article';
import { SousCategorie } from '../../models/article';
import { IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-article-list-component',
  templateUrl: './article-list-component.component.html',
  styleUrls: ['./article-list-component.component.scss'],
  standalone: false,
})
export class ArticleListComponentComponent {
  @Input() articles: Article[] = [];
  @Input() sousCategories: SousCategorie[] = [];
  @Output() articleSelected = new EventEmitter<Article>();

  constructor() {}

  onArticleClick(article: Article) {
    this.articleSelected.emit(article);
  }

  getSousCategorieName(id: number): string {
    const sousCategorie = this.sousCategories.find(sc => sc.id === id);
    return sousCategorie ? sousCategorie.libelle : 'Inconnu';
  }
}