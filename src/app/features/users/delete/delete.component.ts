import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { ScrollerModule } from 'primeng/scroller';
import { ToastModule } from 'primeng/toast';

// Services
import { AppService } from '../../../core/services/app.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { PrimeNGMessagesService } from '../../../core/services/prime-ng-messages.service';
import { RepositoryService } from '../../../core/services/repository.service';

// Components
import { MessageModalComponent } from '../../../core/components/message-modal/message-modal.component';
import { ValidationErrorsComponent } from '../../../core/components/validation-errors/validation-errors.component';

// Interfaces
import { IBASIC_CONFIRMATION_DEFAULT } from '../../../core/interfaces/ibasic-confirmation';
import { IUser } from '../../../core/interfaces/iuser';

// Enums && Constants
import { CRUD, DB } from '../../../core/constants/db';
import { HTTP_ERROR } from '../../../core/constants/http-error';

const db = DB.users,
  { Ok } = HTTP_ERROR;


@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextModule,
    PanelModule,
    ScrollerModule,
    ToastModule,
    MessageModalComponent,
    ValidationErrorsComponent,
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
  providers: [
    ConfirmationService,
    MessageService,
    PrimeNGMessagesService
  ]
})
export class DeleteComponent implements OnInit {

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
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private navigationService: NavigationService,
    private primeNgMessagesService: PrimeNGMessagesService,
    private repositoryService: RepositoryService,
    private route: ActivatedRoute
  ) {
    this.appService.setTitle(db.table, CRUD.delete);
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


  onList = (): void => {
    this.navigationService.navigateByCRUD(db.table, CRUD.list);
  }

  onPrint = (): void => { }

  onRead = (id: string): void => {
    this.navigationService.navigateByCRUD(db.table, CRUD.read, id);
  }

  onSave = (): void => {
    this.confirmationService.confirm({
      message: this.confirmation.message,
      header: this.confirmation.header,
      icon: this.confirmation.icon,
      accept: () => {
        this.appService.process.start('Guardando...');
        this.appService.process.isSuccessful = false;

        this.repositoryService.deleteUserResponse(this.user._id).subscribe({
          next: (response) => {
            this.appService.process.isSuccessful = response.status === Ok.status
            this.appService.process.message = response.message;
            this.appService.response = response;
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
            this.messageService.add(
              this.primeNgMessagesService.getAceptMessage(
                this.appService.process.isSuccessful,
                CRUD.delete,
                db.field,
                this.appService.process.message
              )
            );

            this.appService.process.stop();

            if (this.appService.process.isSuccessful) {
              this.form.reset();
              this.navigationService.navigateByCRUD(db.table, CRUD.list);
            }
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.messageService.add(this.primeNgMessagesService.getRejectMessage(type));
      }
    });
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
