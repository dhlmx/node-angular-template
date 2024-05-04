import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Services
import { HttpService } from './http.service';

// Interfaces & Models
import { INewUser } from '../interfaces/inew-user';
import { IUser } from '../interfaces/iuser';
import { IResponse } from '../interfaces/iresponse';
import { DB } from '../constants/db';

// Enums & Constants
const { api } = environment,
  URL = `${api.host}:${api.port}`,
  db = DB.users;

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(
    private httpService: HttpService
  ) { }

  createUser = (user: INewUser): Observable<IUser> => {
    return this.httpService.getEntity<IUser>(this.createUserResponse(user));
  }

  createUserResponse = (user: INewUser): Observable<IResponse> => {
    return this.httpService.httpPost(`${URL}/${db.table}`, user);
  }

  deleteUser = (id: string): Observable<IUser> => {
    return this.httpService.getEntity<IUser>(this.deleteUserResponse(id));
  }

  deleteUserResponse = (id: string): Observable<IResponse> => {
    return this.httpService.httpDelete(`${URL}/${db.table}/${id}`);
  }

  getUserById = (id: string): Observable<IUser> => {
    return this.httpService.getEntity<IUser>(this.getUserByIdResponse(id));
  }

  getUserByIdResponse = (id: string): Observable<IResponse> => {
    return this.httpService.httpGet(`${URL}/${db.table}/${id}`);
  }

  getUsers = (): Observable<IUser[]> => {
    return this.httpService.getEntities<IUser>(this.getUsersResponse());
  }

  getUsersResponse = (): Observable<IResponse> => {
    return this.httpService.httpGet(`${URL}/${db.table}`);
  }

  updateUser = (id: string, user: INewUser): Observable<IUser> => {
    return this.httpService.getEntity<IUser>(this.updateUserResponse(id, user));
  }

  updateUserResponse = (id: string, user: INewUser): Observable<IResponse> => {
    return this.httpService.httpPut(`${URL}/${db.table}/${id}`, user);
  }
}
