import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { SeriesComponent } from './series/series.component';
import { AccountComponent } from './account/account.component';
import { VerMovieComponent } from './ver-movie/ver-movie.component';
import { VerTvComponent } from './ver-tv/ver-tv.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { loginGuardGuard } from './guards/login-guard.guard';

const routes: Routes = [
  {
    path: '',
    children:[
      {path:'Home', component: HomeComponent},
      {path: 'Movies', canActivate: [loginGuardGuard], component: MovieComponent},
      {path: 'Series', canActivate: [loginGuardGuard],component: SeriesComponent},
      {path: 'Account', canActivate: [loginGuardGuard],component: AccountComponent},
      {path: 'Movie/:id', canActivate: [loginGuardGuard],component: VerMovieComponent},
      {path: 'Tv/:id', canActivate: [loginGuardGuard],component: VerTvComponent},
      {path: 'Login', component: LoginComponent},
      {path: 'Register', component: RegisterComponent},
      {path: '**', redirectTo: 'Home'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
