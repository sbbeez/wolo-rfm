import { IProjectCreate } from "./type";
import { ProjectValidator } from "./validator";

class Controller {
  async create(data: IProjectCreate) {
    ProjectValidator.validateProjectCreateObject(data);
    return { message: "there is a success message" };
  }
}

export const ProjectController = new Controller();
