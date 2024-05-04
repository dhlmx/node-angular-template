import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/list',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: () => import('../app/features/users/users.module').then(m => m.UsersModule)
  },
];
