// external modules
import Ajv from "ajv";

// internal modules
import { descriptionSchema, keySchema, nameSchema } from "./genericSchema";

class BaseValidator {
  ajvInstance;
  constructor() {
    this.ajvInstance = new Ajv({
      schemas: [nameSchema, descriptionSchema, keySchema],
    });
  }
}

export default BaseValidator;
