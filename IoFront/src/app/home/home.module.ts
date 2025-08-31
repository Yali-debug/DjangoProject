import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ArticleListComponentComponent } from '../components/article-list-component/article-list-component.component';
import { ArticleDetailComponentComponent } from '../components/article-detail-component/article-detail-component.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule
],
  declarations: [HomePage, ArticleListComponentComponent, ArticleDetailComponentComponent]
})
export class HomePageModule {}
