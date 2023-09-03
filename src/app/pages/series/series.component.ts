import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { Result } from 'src/app/interfaces/interface';
import { ResultTv } from 'src/app/interfaces/response';
import { ApiService } from 'src/app/services/api.service';
import { enviroment } from 'src/environments/enviroment';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  public series: ResultTv[] = []
  public image: string = enviroment.imageUrl;

  searchQuery: string = '';
  filteredSeries: ResultTv[] = [];
  selectedSeries: ResultTv | null = null;


  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit() {
    this.apiService.SearchPopularTv().subscribe((resp) => {
      this.series = resp.results!;
    });

  }


  onSearchInputChange(event: any) {
    this.searchQuery = event.target.value;
    this.apiService.SearchSeries(this.searchQuery).subscribe((resp) => {
      this.filteredSeries = resp.results!;
    });
  }

  redireccionarSerie(id: number) {
    this.router.navigate(['/pages/Tv/', id]); 
  }
}