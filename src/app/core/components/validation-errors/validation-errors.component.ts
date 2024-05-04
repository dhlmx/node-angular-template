import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollerModule } from 'primeng/scroller';

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [CommonModule, ScrollerModule],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.scss'
})
export class ValidationErrorsComponent implements OnChanges {

  @Input() validationTitle = 'Validation Errors';
  @Input() errors: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }


}
