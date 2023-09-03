import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genre, SerieID } from 'src/app/interfaces/serieId';
import { ApiService } from 'src/app/services/api.service';
import { enviroment } from 'src/environments/enviroment';

@Component({
  selector: 'app-ver-tv',
  templateUrl: './ver-tv.component.html',
  styleUrls: ['./ver-tv.component.css']
})
export class VerTvComponent implements OnInit {

  public series: SerieID[] = []
  public serie!: SerieID;
  public image: string = enviroment.imageUrl;
  public like: boolean = false;
  public serieId!: number;
  public save: boolean = false;
  public serieName: string = '';
  public localStorageData: any[] = JSON.parse(localStorage.getItem('savedSerie') || '[]');


  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {

    const titles = this.localStorageData.map(item => item.title);

    this.route.params.subscribe(params => {
      this.serieId = params['id'];
      this.apiService.SearchIdTv(this.serieId).subscribe((data: SerieID) => {
        this.series.push(data!);
        for (let item of this.series) {
          this.serieName = item.name!
        }
        titles.forEach(title => {

          if (this.serieName === title) {
            this.save = true
          }
        });
      });
    });
  }


  getGenres(): string {
    if (this.serie && this.serie.genres) {
      return this.serie.genres.map((genre: Genre) => genre.name).join(', ');
    }
    return '';
  }

  guardarSerie(poster_path: string, title: string, id:any) {
    const savedItems = JSON.parse(localStorage.getItem('savedSerie') || '[]');
    savedItems.push({ poster_path: poster_path, title: title, id:id });
    localStorage.setItem('savedSerie', JSON.stringify(savedItems));
    this.save = true;
  }

  darLike() { }

}
