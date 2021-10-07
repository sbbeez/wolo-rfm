import { IErrorObj, IErrorResponse } from "../../../api/type/error";

export class ResponseHandler {
  constructor() {}

  constructErrorResponse(errors: IErrorObj[]): IErrorResponse {
    return {
      response_status: "error",
      response_code: "bad_request_error",
      errors,
    };
  }
}
