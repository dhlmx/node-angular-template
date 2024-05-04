import { Injectable } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { IBasicConfirmation } from '../interfaces/ibasic-confirmation';
import { IResponse, IRESPONSE_DEFAULT } from '../interfaces/iresponse';

@Injectable({
  providedIn: 'root'
})
export class PrimeNGMessagesService {

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    // It's intentional
  }

  getAceptMessage = (
    isOK: boolean, crud: string, field: string, detailMessage: string = ''
  ): { severity: string, summary: string, detail: string } => {
    const summary = 'Confirmation';

    let detail = `${field}${isOK ? ' ' : ' not '}${crud}d\n`;

    if (detailMessage !== '') {
      detail += `${detailMessage}`;
    }

    if (isOK) {
       return { severity: 'success', summary, detail };
    } else {
       return { severity: 'warn', summary, detail };
    }
  }

  getMessage = (isOK: boolean, summary: string, detail: string): { severity: string, summary: string, detail: string } => {
    return { severity: isOK ? 'success' : 'warn', summary, detail };
  }

  getRejectMessage = (type: ConfirmEventType): { severity: string, summary: string, detail: string } => {
    let message = { severity: 'warn', summary: '', detail: '' };

    switch (type) {
      case ConfirmEventType.REJECT:
        message.summary = 'Information';
        message.detail = 'Task not processed';
        break;
      case ConfirmEventType.CANCEL:
        this.messageService.add({ severity: 'warn', summary: 'Cancelación', detail: 'Operación cancelada'})
        message.summary = 'Cancel';
        message.detail = 'Task cancelled';
        break;
    }

    return message;
  }

  save = (confirmation: IBasicConfirmation): void => {
    this.confirmationService.confirm({
      message: confirmation.message,
      header: confirmation.header,
      icon: confirmation.icon || 'pi pi-exclamation-triangle',
      accept: () => {
        confirmation.acceptMethod();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'warn', summary: confirmation.rejectSummary || 'Summary', detail: confirmation.rejectDetail || 'Task not processed' })
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: confirmation.cancelSummary || 'Summary', detail: confirmation.cancelDetail  || 'Task cancelled' })
            break;
        }
      }
    });
  }
}
