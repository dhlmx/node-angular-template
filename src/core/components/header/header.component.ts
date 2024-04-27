import { Component } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menuItems: MenuItem[] = [
    {
      icon: PrimeIcons.LIST,
      label: 'Members',
      items: [
        {
          icon: PrimeIcons.SIGN_IN,
          label: 'List',
          routerLink: `/members`
        },
        {
          icon: PrimeIcons.SYNC,
          label: 'Update',
          routerLink: `/members/update`
        },
        {
          icon: PrimeIcons.SIGN_OUT,
          label: 'Delete',
          routerLink: `/members/delete`
        }
      ]
    },
    {
      icon: PrimeIcons.ID_CARD,
      label: 'Session',
      items: [
        {
          icon: PrimeIcons.SIGN_IN,
          label: 'Login',
          routerLink: `/auth/login`
        },
        {
          icon: PrimeIcons.SYNC,
          label: 'Reset Password',
          routerLink: `/auth/reset`
        },
        {
          icon: PrimeIcons.SIGN_OUT,
          label: 'Logout',
          routerLink: `/auth/logout`
        }
      ]
    }
  ];
}
