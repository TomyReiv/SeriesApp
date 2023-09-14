import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';
import { enviroment } from 'src/environments/enviroment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public movies: Result[] = []
  public image: string = enviroment.imageUrl;
  public no_image: string = '../../../assets/no_image.png'

  searchQuery: string = '';
  filteredSeries: Result[] = [];
  selectedSeries: Result | null = null;


  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit() {
    this.apiService.searchPopularMovie().subscribe((resp) => {
      this.movies = resp.results!;
    });
  }

  onSearchInputChange(event: any) {
    this.searchQuery = event.target.value;
    this.apiService.SearchMovie(this.searchQuery).subscribe((resp) => {
      this.filteredSeries = resp.results!;
    });
  }

  redireccionarMovie(id: number) {
    this.router.navigate(['/pages/Movie/', id]);
  }
}
