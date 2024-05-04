import { HttpErrorResponse } from '@angular/common/http';

// Services && Utilities
import { isIResponse } from './interface.service';

// Interfaces & Models
import { IResponse } from '../interfaces/iresponse';

// Types
export type ErrorType = Error | ErrorEvent | HttpErrorResponse | IResponse;

// Constants & Enums
import { HTTP_ERROR } from '../constants/http-error';

const { Ok, NotAcceptable, InternalServerError } = HTTP_ERROR;

export const handleErrorAsIResponse = (response: HttpErrorResponse): IResponse => {
  let iResponse = { ...InternalServerError, message: '', data: response } as IResponse;

  if (response.error) {
    if (isIResponse(response.error)) {
      return response.error as IResponse;
    }

    iResponse.message = translateError(parseError(response.error));
    return iResponse;
  }

  if (!response.ok) {
    iResponse.message = translateError(parseError(response.error));
    return iResponse;
  }

  if (response.message) {
    iResponse.message = translateError(response.message, response.statusText);
    return iResponse;
  }

  console.warn(iResponse, 'ErrorService', 'handleErrorAsIResponse()', response, iResponse);
  return iResponse;
},

parseError = (entity: ErrorType): string => {
  if (isIResponse(entity)) {
    console.info('IResponse', entity);
    return parseIResponseMessage(entity);
  }

  if (entity instanceof HttpErrorResponse) {
    console.info('HttpErrorResponse');

    if (entity.error) {
      return parseError(entity.error);
    } else if (entity.message) {
      return entity.message;
    }
  }

  if (entity instanceof ErrorEvent) {
    console.info('HttpErrorResponse');
    return entity.message;
  }

  return '';
},

parseIResponseMessage = (entity: IResponse): string => {
  let detail = '';

  switch (entity.status) {
    case Ok.status:
      return detail;
    case NotAcceptable.status:
      detail = `${entity.message}`;

      if (entity.message === 'Validation error' && Array.isArray(entity.data)) {
        detail += ':';

        for (const item of entity.data) {
          detail += `\n${item}`;
        }
      }

      return detail;
    default:
      return entity.message;
  }
},

translateError = (message: string, status?: string): string => {
  // Errors without message
  if (!message) {
    return 'Error without description';
  }

  console.info('translateError->Not translated', message, status);
  return 'Error detected';
};
