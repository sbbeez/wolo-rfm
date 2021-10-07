import { IResponse } from "./response";

export interface IErrorResponse extends IResponse {
  errors: IErrorObj[];
}

export interface IErrorObj {
  error_code: string;
  error_path?: string;
  description: string;
  error_reason: string;
}
