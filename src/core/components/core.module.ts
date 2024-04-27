import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgModule } from '../modules/prime-ng/prime-ng.module';

// Components & Pipes
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MessageModalComponent } from '../components/message-modal/message-modal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    // PageNotFoundComponent
  ],
  imports: [
    // CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    // NoopAnimationsModule,
    // FormsModule,
    // ReactiveFormsModule,
    // HttpClientJsonpModule,
    // PrimeNgModule
    FooterComponent,
    HeaderComponent,
    MessageModalComponent
  ],
  exports: [
    // CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    // NoopAnimationsModule,
    // FormsModule,
    // ReactiveFormsModule,
    // HttpClientJsonpModule,
    // PrimeNgModule,
    // Components
    FooterComponent,
    HeaderComponent,
    MessageModalComponent
    // PageNotFoundComponent
  ]
})
export class CoreModule { }
