// internal modules
import AjvInstance from "./ajvInstance";

class BaseValidator {
  public ajvInstance;
  constructor() {
    this.ajvInstance = AjvInstance.ajvInstance;
  }
}

export default BaseValidator;
