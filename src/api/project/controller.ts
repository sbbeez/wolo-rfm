import { IProjectCreate } from "./type";
import { ProjectValidator } from "./validator";

class Controller {
  async create(data: IProjectCreate) {
    return ProjectValidator.validateProjectCreateObject(data);
  }
}

export const ProjectController = new Controller();
