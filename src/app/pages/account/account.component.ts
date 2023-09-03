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

  public user: string = '';

  private router = inject(Router);


  ngOnInit(): void {
    this.savedSerie = this.getSavedItems('savedSerie');
    this.savedMovie = this.getSavedItems('savedItems');
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
  }

  redireccionarSerie(id: number, path:string) {
    this.router.navigate([`/pages/${path}/`, id]); 
  }
}
