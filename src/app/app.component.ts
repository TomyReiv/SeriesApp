import { Component, computed, effect, inject } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthStatus } from './interfaces/auth-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SeriesApp';

  private userService = inject(UserService);
  private router = inject(Router);
  public url = localStorage.getItem('url');

  public finishUserCheck = computed<boolean>(() => {
    if (this.userService.authStatus() === AuthStatus.checking) {
      return false
    }

    return true
  });

  public userStatusChengeEfect = effect(() => {
    switch (this.userService.authStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigate([`${this.url}`])
        return;
      case AuthStatus.noAuthenticated:
        this.router.navigate(['/pages/Login'])
        return;
    }
  });
}
