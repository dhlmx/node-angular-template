import { Component } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';


// Enums && Constants
import { CRUD, DB } from '../../constants/db';
const db = DB.users;

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
      icon: PrimeIcons.USERS,
      label: 'Users',
      items: [
        {
          icon: PrimeIcons.USERS,
          label: 'List',
          routerLink: `/${db.table}/${CRUD.list}`
        },
        {
          icon: PrimeIcons.USER_PLUS,
          label: 'Create',
          routerLink: `/${db.table}/${CRUD.create}`
        }/*,
        {
          icon: PrimeIcons.USER_EDIT,
          label: 'Update',
          routerLink: `/${db.table}/${CRUD.update}`
        },
        {
          icon: PrimeIcons.USER_MINUS,
          label: 'Delete',
          routerLink: `/${db.table}/${CRUD.delete}`
        }*/
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
