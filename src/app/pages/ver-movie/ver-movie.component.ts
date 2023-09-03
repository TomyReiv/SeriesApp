import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genre, MovieID } from 'src/app/interfaces/movieId';
import { ApiService } from 'src/app/services/api.service';
import { enviroment } from 'src/environments/enviroment';

@Component({
  selector: 'app-ver-movie',
  templateUrl: './ver-movie.component.html',
  styleUrls: ['./ver-movie.component.css']
})
export class VerMovieComponent {
  public movies: MovieID[] = []
  public movie!: MovieID;
  public image: string = enviroment.imageUrl;
  public like: boolean = false;
  public movieId!: number;
  public save: boolean = false;
  public movieName: string = '';
  public localStorageData: any[] = JSON.parse(localStorage.getItem('savedItems') || '[]');

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }
  ngOnInit() {

    const titles = this.localStorageData.map(item => item.title);

    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.apiService.SearchIdMovie(this.movieId).subscribe((data: MovieID) => {
        this.movies.push(data!);

        for (let item of this.movies) {
          this.movieName = item.title!
        }
        titles.forEach(title => {

          if (this.movieName === title) {
            this.save = true
          }
        });
      });
    });
  }


getGenres(): string {
  if (this.movie && this.movie.genres) {
    return this.movie.genres.map((genre: Genre) => genre.name).join(', ');
  }
  return '';
}

guardarMovie(poster_path: string, title: string, id:any){
  const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
  savedItems.push({ poster_path: poster_path, title: title, id:id });
  localStorage.setItem('savedItems', JSON.stringify(savedItems));
  this.save = true;
 }

darLike(){ }
}
