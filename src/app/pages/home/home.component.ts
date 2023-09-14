import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/interface';
import { ResultTv } from 'src/app/interfaces/response';
import { ApiService } from 'src/app/services/api.service';
import { enviroment } from 'src/environments/enviroment';
import {  DataViewLayoutOptions } from 'primeng/dataview';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public imageUrl: string = enviroment.imageUrl;
  public images: Result[] = [];
  public imagesUpcoming: Result[] = [];
  public imagesTv: ResultTv[] = [];
  public no_image: string = '../../../assets/no_image.png'

  constructor(private apiService: ApiService, private router: Router){}
  

  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

ngOnInit() {
  this.apiService.searchPopularMovie().subscribe((resp) => {
    this.images = resp.results!.slice(0, 7);
  });

  this.apiService.searchUpcomingMovie().subscribe((resp) => {
    this.imagesUpcoming = resp.results!.slice(0, 10);
  });

  this.apiService.SearchPopularTv().subscribe((resp) => {
    this.imagesTv = resp.results!.slice(0, 7);
  });
}

redireccionar(id: number, name: string) {
  this.router.navigate([`/pages/${name}/`, id]); 
}

}
