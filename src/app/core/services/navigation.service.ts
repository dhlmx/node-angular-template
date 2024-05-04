import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {}

  navigateByCRUD = (table: string, crud: string, id?: string): void => {
    if (id) {
      this.router.navigateByUrl(`/${table}/${id}/${crud}`);
    } else {
      this.router.navigateByUrl(`/${table}/${crud}`);
    }
  }

  navigateByTable = (table: string, id?: string): void => {
    if (id) {
      this.router.navigateByUrl(`/${table}/${id}`);
    } else {
      this.router.navigateByUrl(`/${table}`);
    }
  }

  navigateByURL = (url: string): void => {
    this.router.navigateByUrl(url);
  }

  navigateToLogin = (): void => {
    this.navigateByURL('auth/login');
  }
}
