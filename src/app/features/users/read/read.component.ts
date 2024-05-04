import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';

// Services
import { AppService } from '../../../core/services/app.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { RepositoryService } from '../../../core/services/repository.service';

// Components
import { MessageModalComponent } from '../../../core/components/message-modal/message-modal.component';

// Interfaces
import { IUser } from '../../../core/interfaces/iuser';
import { IBASIC_CONFIRMATION_DEFAULT } from '../../../core/interfaces/ibasic-confirmation';

// Enums && Constants
import { CRUD, DB } from '../../../core/constants/db';
import { PrimeNGMessagesService } from '../../../core/services/prime-ng-messages.service';
const db = DB.users;

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    PanelModule,
    MessageModalComponent
  ],
  templateUrl: './read.component.html',
  styleUrl: './read.component.scss',
})
export class ReadComponent implements OnInit {

  controls = {
    _id: new FormControl({ value: '', disabled: true }, Validators.required),
    userName: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(db.userName.minLength), Validators.maxLength(db.userName.maxLength)]),
    name:  new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(db.name.minLength), Validators.maxLength(db.name.maxLength)]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(db.email.minLength), Validators.maxLength(db.email.maxLength)]),
    password: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(db.password.minLength), Validators.maxLength(db.password.maxLength)]),
    profileImage: new FormControl({ value: '', disabled: true }),
    __v: new FormControl({ value: 0, disabled: true })
  };

  form = new FormGroup({
    ...this.controls
  });

  user = {} as IUser;

  confirmation = { ...IBASIC_CONFIRMATION_DEFAULT };

  constructor(
    public appService: AppService,
    private navigationService: NavigationService,
    private repositoryService: RepositoryService,
    private route: ActivatedRoute
  ) {
    this.appService.setTitle(db.table, CRUD.read);
  }

  ngOnInit(): void {
    this.initialize();
  }

  private initialize = (): void => {
    this.appService.process.start('Loading...');

    this.controls._id.setValue(this.route.snapshot.paramMap.get('id'));

    this.repositoryService.getUserById(this.controls._id.value!).subscribe({
      next: (user) => {
        this.user = user;
      },
      complete: () => {
        this.resetForm(this.user);
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

  onList = (): void => {
    this.navigationService.navigateByCRUD(db.table, CRUD.list);
  }

  onPrint = (): void => { }

  onRead = (id: string): void => {
    this.navigationService.navigateByCRUD(db.table, CRUD.read, id);
  }

  onUpdate = (id: string): void => {
    this.navigationService.navigateByCRUD(db.table, CRUD.update, id);
  }

  private resetForm = (user: IUser): void => {
    this.controls.__v.setValue(user.__v);
    this.controls._id.setValue(user._id);
    this.controls.email.setValue(user.email);
    this.controls.name.setValue(user.name);
    this.controls.password.setValue(user.password);
    this.controls.profileImage.setValue(user.profileImage);
    this.controls.userName.setValue(user.userName);
  }
}
