import { Component, OnInit} from '@angular/core';
import { ApiService } from '../service/api';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  article : any = []
  constructor(private apiService: ApiService) {}
  ngOnInit (): void {
    this.getArticles();
  }

  getArticles(): void {
    this.apiService.getArticles().subscribe ((data) => {
      this.article = data;
      console.log(this.article);
    });
  }

}
