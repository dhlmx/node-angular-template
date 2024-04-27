import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

// Interfaces & Models
import { Process } from '../models/process';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  process = new Process();

  constructor(
    private meta: Meta,
    private title: Title
  ) { }

  setTitle = (title: string, subtitle: string): void => {
    this.title.setTitle(`${title} | ${subtitle}`)
  }

  setTags = (description: string): void => {
    this.meta.addTags([
      { name: 'Description', content: description }
    ]);
  }
}
