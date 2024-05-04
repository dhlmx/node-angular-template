export interface IBasicConfirmation {
  message: string;
  header: string;
  icon: string;
  crud: string;
  acceptMethod: Function;
  rejectSummary: string;
  rejectDetail: string;
  cancelSummary: string;
  cancelDetail: string;
}

export const IBASIC_CONFIRMATION_DEFAULT = {
  message: 'Are you sure?',
  header: 'Confirmation',
  icon: 'pi pi-exclamation-triangle',
  crud: '',
  acceptMethod: (): void => {
    // It's intentional
  },
  rejectSummary: '',
  rejectDetail: '',
  cancelSummary: '',
  cancelDetail: ''
} as IBasicConfirmation;
