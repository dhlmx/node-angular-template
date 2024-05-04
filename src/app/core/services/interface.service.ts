import { IResponse } from '../interfaces/iresponse';

export const isIResponse = (entity: any): entity is IResponse => {
  const test = entity as IResponse;

  return test.status !== undefined && typeof test.status === 'number'
    && test.code !== undefined && typeof test.code === 'string'
    && test.message !== undefined && typeof test.message === 'string'
    && test.data !== undefined;
};
