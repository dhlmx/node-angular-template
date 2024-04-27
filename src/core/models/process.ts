export class Process {

  deletingMode = false;
  processingMode = false;
  readingMode = false;

  isSuccessful = false;
  message = '';

  start = (message?: string): void => {
    this.processingMode = true;

    if (message) {
      this.message = message;
    }
  }

  stop = (): void => {
    this.processingMode = false;
    this.message = '';
  }
}
