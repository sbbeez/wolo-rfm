/**
 * This module takes responsibility to validate the incoming object
 * Once validated, invokes controller layer to do any business logic
 */
// external modules
import ajv from "ajv";

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

  validateProjectCreateObject(data: IProjectCreate) {
    const isValid = this.projectCreateValidator(data);
    // return this.projectCreateValidator.errors;
    if (!isValid) {
      throw this.projectCreateValidator.errors;
    }
  }
}

export const ProjectValidator = new Validator();
