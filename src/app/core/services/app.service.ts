import { Injectable } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

// Interfaces & Models
import { IRESPONSE_DEFAULT, IResponse } from '../interfaces/iresponse';
import { Process } from '../models/process';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private titleCasePipe = new TitleCasePipe();

  process = new Process();
  response: IResponse = { ...IRESPONSE_DEFAULT };

  constructor(
    private meta: Meta,
    private title: Title  ) { }

  setTitle = (title: string, subtitle: string): void => {
    this.title.setTitle(this.titleCasePipe.transform(`${title} | ${subtitle}`));
  }

  setTags = (description: string): void => {
    this.meta.addTags([
      { name: 'Description', content: description }
    ]);
  }
}
