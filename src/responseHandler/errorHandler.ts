import { IAjvValidatorError } from "../validator/type";
import { ResponseHandler } from "./responseHandler";
import {
  AjvErrorTypes,
  IErrorObj,
  IErrorResponse,
  ValidationErrorTypes,
} from "./type";

class ErrorHandler extends ResponseHandler {
  constructor() {
    super();
  }

  handleError(err) {
    return this.handleValidationErrors(err);
  }

  handleValidationErrors = (
    validatorError: IAjvValidatorError[]
  ): IErrorResponse => {
    const errors = validatorError.map((error) => {
      switch (error.keyword) {
        case AjvErrorTypes.REQUIRED:
          return this._handleMissingProperty(error);
        case AjvErrorTypes.TYPE:
          return this._handleInvalidInput(
            error,
            ValidationErrorTypes.INVALID_TYPE
          );
        case AjvErrorTypes.PATTERN:
          return this._handleInvalidInput(
            error,
            ValidationErrorTypes.PATTERN_MATCH
          );
        case AjvErrorTypes.MAX_ITEMS:
        case AjvErrorTypes.MAX_LENGTH:
          return this._handleInvalidInput(
            error,
            ValidationErrorTypes.MAX_LENGTH_EXCEEDED
          );
        case AjvErrorTypes.MIN_ITEMS:
        case AjvErrorTypes.MIN_LENGTH:
          return this._handleInvalidInput(
            error,
            ValidationErrorTypes.LESS_THAN_REQUIRED_MIN_LENGTH
          );
        case AjvErrorTypes.DUPLICATE_ITEMS_FOUND:
          return this._handleInvalidInput(
            error,
            ValidationErrorTypes.DUPLICATE_INPUT
          );
        default:
          return this._handleInvalidInput(
            error,
            ValidationErrorTypes.UNKNOWN_ERROR
          );
      }
    });
    return this.handlerErrorResponse(errors);
  };

  _handleMissingProperty = (error: IAjvValidatorError): IErrorObj => {
    const splitValue = error.params?.missingProperty?.split("/") || [];
    const missingField = splitValue[splitValue.length - 1] || "unknown_field";
    return {
      error_type: "missing_property",
      missing_field: missingField,
      error_reason: error.message,
      error_code: ValidationErrorTypes.REQUIRED_PROPERTY_NOT_FOUND,
    };
  };

  _handleInvalidInput = (
    error: IAjvValidatorError,
    error_code: ValidationErrorTypes
  ): IErrorObj => {
    return {
      error_type: "invalid_input",
      error_path: error.instancePath,
      error_reason: error.message,
      error_code,
    };
  };

  handleAuthenticationError = () => {};
  handleIdempotentError = () => {};
  handleUncaughtError = () => {};
}

export default ErrorHandler;
