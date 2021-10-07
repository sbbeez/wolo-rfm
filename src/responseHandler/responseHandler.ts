import { IErrorObj, IErrorResponse } from "./type";

export class ResponseHandler {
  handlerErrorResponse(errors: IErrorObj[]): IErrorResponse {
    return {
      response_status: "error",
      response_code: "bad_request_error",
      errors,
    };
  }
}
