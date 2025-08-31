import { Component, Input } from '@angular/core';
import { Article } from '../../models/article';
import { SousCategorie } from '../../models/article';

@Component({
  selector: 'app-article-detail-component',
  templateUrl: './article-detail-component.component.html',
  styleUrls: ['./article-detail-component.component.scss'],
  standalone: false,
})
export class ArticleDetailComponentComponent {
  @Input() article!: Article;
  @Input() sousCategories: SousCategorie[] = [];

  constructor() {}

  getSousCategorieName(id: number): string {
    const sousCategorie = this.sousCategories.find(sc => sc.id === id);
    return sousCategorie ? sousCategorie.libelle : 'Inconnu';
  }
}