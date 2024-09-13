import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Movie } from 'src/app/core/models/movie.interface';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() title: string = '';
  @Input() dataSource: string = '';
  @Input() idAncla: string = '';
  responsiveOptions: any[] | undefined;
  data: any;

  constructor(private api: ApiService) {}

  ngAfterViewInit(): void {
    this.setCarousel(this.dataSource);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes['data']?.currentValue;
  }

  setCarousel(uri: string = '') {
    this.api
      .doRequest(uri, {}, 'get')
      .then((movies: any) => {
        this.data = movies?.results.map((movie: Movie) => {
          return {
            original_title: movie?.original_title,
            overview: movie?.overview,
            backdrop_path:
              'https://image.tmdb.org/t/p/w500' + movie?.backdrop_path,
          };
        });
      })
      .catch((error) => {
        this.data = [
          {
            original_title: 'sin datos',
            overview: 'sin datos',
            backdrop_path: '../../../assets/images/remove-file_11366800.png',
          },
        ];
      });
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '992px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '0px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
