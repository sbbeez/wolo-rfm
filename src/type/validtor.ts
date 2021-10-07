export interface IAjvValidatorError {
  instancePath: string;
  schemaPath: string;
  keyword: string;
  params: {
    [key: string]: number | string;
  };
  message: string;
}
