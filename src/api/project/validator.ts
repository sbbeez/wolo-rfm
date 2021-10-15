/**
 * This module takes responsibility to validate the incoming object
 * Once validated, invokes controller layer to do any business logic
 */

// internal modules
import { BaseValidator } from "../../validator";
import { projectCreateSchema } from "./schema";
import { IProjectCreate } from "./type";
class Validator extends BaseValidator {
  projectCreateValidator;

  constructor() {
    super();
    this.projectCreateValidator = this.ajvInstance.compile(projectCreateSchema);
  }

  validateProjectCreateInput(data: IProjectCreate) {
    const isValid = this.projectCreateValidator(data);
    if (!isValid) {
      throw this.projectCreateValidator.errors;
    }
  }
}

export const ProjectValidator = new Validator();
