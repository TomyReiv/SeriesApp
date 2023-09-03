import { Injectable } from '@angular/core';
import { Tv } from '../interfaces/response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/environments/enviroment';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/interface';
import { SerieID } from '../interfaces/serieId';
import { MovieID } from '../interfaces/movieId';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public result: Game | undefined;
  public resultTv: Tv | undefined;
  public apikey = enviroment.api_key;
  public url = enviroment.baseUrl;
  public popularUrl = enviroment.popularUrl;


  constructor(private http: HttpClient) {
  }

  SearchMovie(query: string): Observable<Game> {
    query = query.trim().toLowerCase();

    const params = new HttpParams()
      .set('language', 'es-SP')
      .set('api_key', this.apikey)
      .set('query', query)
      .set('append_to_response', 'images');

    return this.http.get<Game>(`${this.url}/movie`, { params: params })
  }

  SearchSeries(query: string): Observable<Tv> {
    query = query.trim().toLowerCase();

    const params = new HttpParams()
      .set('language', 'es-SP')
      .set('api_key', this.apikey)
      .set('query', query)
      .set('append_to_response', 'images');

    return this.http.get<Tv>(`${this.url}/tv`, { params: params })
  }

  SearchPopularTv(): Observable<Tv> {

    const params = new HttpParams()
      .set('language', 'es-SP')
      .set('api_key', this.apikey)
      .set('append_to_response', 'images');

    return this.http.get<Tv>(`${this.popularUrl}/tv/top_rated`, { params: params })
  }

  SearchIdTv(id:number): Observable<SerieID> {
    const params = new HttpParams()
      .set('language', 'es-SP')
      .set('api_key', this.apikey)
      .set('append_to_response', 'images');

    return this.http.get<SerieID>(`${this.popularUrl}/tv/${id}`, { params: params })
  }

  SearchIdMovie(id:number): Observable<MovieID> {
    const params = new HttpParams()
      .set('language', 'es-SP')
      .set('api_key', this.apikey)
      .set('append_to_response', 'images');

    return this.http.get<MovieID>(`${this.popularUrl}/movie/${id}`, { params: params })
  }

  searchPopularMovie(): Observable<Game> {
    const params = new HttpParams()
      .set('language', 'es-SP')
      .set('api_key', this.apikey)
      .set('append_to_response', 'images');

    return this.http.get<Game>(`${this.popularUrl}/movie/top_rated`, { params: params });
  }

  searchUpcomingMovie(): Observable<Game> {
    const params = new HttpParams()
      .set('language', 'es-SP')
      .set('api_key', this.apikey)
      .set('append_to_response', 'images');

    return this.http.get<Game>(`${this.popularUrl}/movie/upcoming`, { params: params });
  }

}
