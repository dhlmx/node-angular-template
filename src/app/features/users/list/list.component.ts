import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoreModule } from '../../../core/core.module';

// Services && Utilities
import { AppService } from '../../../core/services/app.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { PrimeNGMessagesService } from '../../../core/services/prime-ng-messages.service';
import { RepositoryService } from '../../../core/services/repository.service';

// Interfaces && Models
import { IUser } from '../../../core/interfaces/iuser';
import { CRUD, DB } from '../../../core/constants/db';
import { ActivatedRoute } from '@angular/router';

// Enums && Constants
const db = DB.users;

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CoreModule, PanelModule, TableModule, TagModule, ButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  list: IUser[] = [];

  constructor(
    public appService: AppService,
    private navigationService: NavigationService,
    private repositoryService: RepositoryService,
    // private primeNgMessagesService: PrimeNGMessagesService,
  ) {
    this.appService.setTitle(db.table, CRUD.list);
  }

  ngOnInit(): void {
    this.appService.process.start('Cargando usuarios...');

    this.repositoryService.getUsers().subscribe({
      next: (users) => {
        this.list = users;
      },
      complete: () => {
        this.appService.process.stop();
      }
    });
  }

  onCreate = (): void => {
    this.navigationService.navigateByCRUD(db.table, CRUD.create);
  }

  onDelete = (id: string): void => {
    this.navigationService.navigateByCRUD(db.table, CRUD.delete, id);
  }

  onPrint = (): void => {
  }

  onRead = (id: string): void => {
    this.navigationService.navigateByCRUD(db.table, CRUD.read, id);
  }

  onUpdate = (id: string): void => {
    this.navigationService.navigateByCRUD(db.table, CRUD.update, id);
  }
}
