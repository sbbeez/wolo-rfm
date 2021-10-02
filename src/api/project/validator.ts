/**
 * This module takes responsibility to validate the incoming object
 * Once validated, invokes controller layer to do any business logic
 */

import { ProjectController } from "./controller";

class Validator {
  async create(data: any) {
    return ProjectController.create(data);
  }
}

export const ProjectValidator = new Validator();
