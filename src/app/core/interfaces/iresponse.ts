export interface IResponse {
  status: number;
  code: string;
  message: string;
  data: any;
}

export const IRESPONSE_DEFAULT = {
  status: 0,
  code: '',
  message: '',
  data: {}
} as IResponse;
