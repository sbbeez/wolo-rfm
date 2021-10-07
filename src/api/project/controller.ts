import { IProjectCreate } from "./type";
import { ProjectValidator } from "./validator";

class Controller {
  async create(data: IProjectCreate) {
    ProjectValidator.validateProjectCreateObject(data);
    return { message: "Successfully created new project" };
  }
}

export const ProjectController = new Controller();
