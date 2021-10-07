import { IErrorResponse, IErrorObj } from "../../type/error";
import { IAjvValidatorError } from "../../../type";
import { ResponseHandler } from "../response";

class ErrorHandler extends ResponseHandler {
  constructor() {
    super();
  }

  constructErrorObject(error: IAjvValidatorError): IErrorObj {
    return {
      error_code: "invalid_input | missing_input",
      error_path: "// only in case of invalid_input/missing_input",
      description: "project name should start with characters",
      error_reason: "invalid_project_name",
    };
  }

  handleError(errorObject: IAjvValidatorError[]): IErrorResponse {
    const errorArr = errorObject.map((error) =>
      this.constructErrorObject(error)
    );
    return super.constructErrorResponse(errorArr);
  }
}

export default ErrorHandler;
