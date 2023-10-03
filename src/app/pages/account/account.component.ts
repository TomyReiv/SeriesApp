import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from 'src/environments/enviroment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  public savedSerie: any[] = [];
  public savedMovie: any[] = [];
  public image: string = enviroment.imageUrl;
  public no_image: string = '../../../assets/no_image.png'
  public user: string = '';
  public watchedList: any[] = [];
  
  private router = inject(Router);


  ngOnInit(): void {
    this.savedSerie = this.getSavedItems('savedSerie');
    this.savedMovie = this.getSavedItems('savedItems');
    this.watchedList = this.getSavedItems('watched');
    this.user = localStorage.getItem('user')?.toString() || '';
  }

  getSavedItems(path: string): any[] {
    const savedItems = JSON.parse(localStorage.getItem(path) || '[]');
    return savedItems;
  }

  removeSavedItem(index: number, path: string): void {
    const storage = this.getSavedItems(path);
    storage.splice(index, 1);
    localStorage.setItem(path, JSON.stringify(storage));
    this.savedMovie = storage;

    this.savedSerie = this.getSavedItems('savedSerie');
    this.savedMovie = this.getSavedItems('savedItems');
    this.watchedList = this.getSavedItems('watched');
  }


  redireccionarSerie(id: number, path:string) {
    this.router.navigate([`/pages/${path}/`, id]); 
  }


  watched(poster_path: string, title: string, id:any){
    this.watchedList = JSON.parse(localStorage.getItem('watched') || '[]');
    this.watchedList.push({ poster_path: poster_path, title: title, id:id });
    localStorage.setItem('watched', JSON.stringify(this.watchedList));
   }
}
