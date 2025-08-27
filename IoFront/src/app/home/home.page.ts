import { Component, OnInit, viewChild, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import { ApiService } from '../service/api';
import { Article } from '../service/article';

// Import Swiper
import { Swiper } from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit{

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('featuredSwiper') featuredSwiper!: ElementRef;

  
  articles : Article [] = [];
  featuredArticles: Article[] = [];
  articleSelectionne: Article | null = null;
  modeDetail = false;

   // Instances Swiper
  swiperInstance: Swiper | null = null;
  featuredSwiperInstance: Swiper | null = null;

  constructor(private apiService: ApiService) {}


  ngAfterViewInit(): void {
    this.initSwipers();
  }

  ngOnInit (): void {
    this.getArticles();
  }

  initSwipers() {
    // Swiper principal
    if (this.swiperContainer) {
      this.swiperInstance = new Swiper(this.swiperContainer.nativeElement, {
        modules: [Navigation, Pagination],
        ...this.apiService.swiperConfig
      });
    }

    // Swiper des articles en vedette
    if (this.featuredSwiper) {
      this.featuredSwiperInstance = new Swiper(this.featuredSwiper.nativeElement, {
        modules: [Pagination, Autoplay, EffectFade],
        ...this.apiService.featuredSwiperConfig
      });
    }
  }

  getArticles(): void {
    this.apiService.getArticles().subscribe ((data) => {
      this.articles = data;
      this.featuredArticles = data.slice(0,3);
      console.log(this.articles);
    });
  }

  getDetail(article: Article): void {
    this.articleSelectionne = article;
    this.modeDetail = true;
  }

  retourListe() {
    this.articleSelectionne = null;
    this.modeDetail = false;
  }

  doRefresh(event: any) {
    this.apiService.getArticles().subscribe({
      next: (data: Article[]) => {
        this.articles = data;
        this.articleSelectionne = null;
        this.modeDetail = false;
        event.target.complete();

        //Réinitialiser les swipers
        setTimeout(() => {
          this.initSwipers();
        }, 100);
      }
    });
  }
  // Navigation programatique
  slideNext() {
    this.swiperInstance?.slideNext();
  }

  slidePrev() {
    this.swiperInstance?.slidePrev();
  }

  slideTo(index: number) {
    this.swiperInstance?.slideTo(index);
  }
}
