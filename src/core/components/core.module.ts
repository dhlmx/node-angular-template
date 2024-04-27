import { NgModule } from '@angular/core';

// Components & Pipes
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MessageModalComponent } from '../components/message-modal/message-modal.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
  ],
  imports: [
    FooterComponent,
    HeaderComponent,
    MessageModalComponent,
    PageNotFoundComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MessageModalComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule { }
