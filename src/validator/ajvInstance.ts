// external modules
import Ajv from "ajv";

// internal modules
import { descriptionSchema, keySchema, nameSchema } from "./genericSchema";

class AjvSingleton {
  ajvInstance;
  constructor() {
    const ajv = new Ajv({
      schemas: [nameSchema, descriptionSchema, keySchema],
    });
    require("ajv-keywords")(ajv);
    this.ajvInstance = ajv;
  }
}

export default new AjvSingleton();
