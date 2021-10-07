export interface IErrorResponse extends IResponse {
  errors: IErrorObj[];
}

export interface IErrorObj {
  error_code: string;
  error_path?: string;
  missing_field?: string;
  error_reason: string;
  error_type: string;
}

export interface IResponse {
  response_code: string;
  response_status: string;
}

export enum AjvErrorTypes {
  TYPE = "type",
  REQUIRED = "required",
  PATTERN = "pattern",
  MIN_LENGTH = "minLength",
  MIN_ITEMS = "minItems",
  MAX_ITEMS = "maxItems",
  MAX_LENGTH = "maxLength",
  DUPLICATE_ITEMS_FOUND = "uniqueItemProperties",
}

export enum ValidationErrorTypes {
  MAX_LENGTH_EXCEEDED = "max_length_exceeded",
  LESS_THAN_REQUIRED_MIN_LENGTH = "less_than_required_min_length",
  INVALID_TYPE = "invalid_type",
  PATTERN_MATCH = "pattern_match",
  REQUIRED_PROPERTY_NOT_FOUND = "required_property_not_found",
  DUPLICATE_INPUT = "duplicate_input_found",
  UNKNOWN_ERROR = "unknow_error",
}
