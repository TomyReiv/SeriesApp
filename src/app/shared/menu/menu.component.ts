import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    items: MenuItem[] | undefined;

    private userService = inject(UserService);

    logOut(){
        this.userService.logout();
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                routerLink: '/pages/Home'
            },
            {
                label: 'Películas',
                icon: 'pi pi-fw pi-ticket',
                routerLink: '/pages/Movies'
            },
            {
                label: 'Series',
                icon: 'pi pi-fw pi-desktop',
                routerLink: '/pages/Series'
            },
            {
                label: 'Tu cuenta',
                icon: 'pi pi-fw pi-user',
                routerLink: '/pages/Account'
            }
        ];
    }
}
