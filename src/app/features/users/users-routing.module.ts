import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ReadComponent } from './read/read.component';
import { CRUD } from '../../core/constants/db';



const routes: Routes = [
  { path: '', redirectTo: `/${CRUD.list}`, pathMatch: 'full' },
  { path: `${CRUD.list}`, component: ListComponent },
  { path: `${CRUD.create}`, component: CreateComponent },
  { path: `:id/${CRUD.read}`, component: ReadComponent },
  { path: `:id/${CRUD.update}`, component: UpdateComponent },
  { path: `:id/${CRUD.delete}`, component: DeleteComponent },
  { path: '**', redirectTo: `/${CRUD.list}` }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
