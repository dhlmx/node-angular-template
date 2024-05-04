import { NgModule } from '@angular/core';

// Components & Pipes
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MessageModalComponent } from '../components/message-modal/message-modal.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';

@NgModule({
  declarations: [
  ],
  imports: [
    FooterComponent,
    HeaderComponent,
    MessageModalComponent,
    PageNotFoundComponent,
    ValidationErrorsComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MessageModalComponent,
    PageNotFoundComponent,
    ValidationErrorsComponent
  ]
})
export class CoreModule { }
