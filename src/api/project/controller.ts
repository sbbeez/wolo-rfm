import { IProjectCreate } from "./type";
import { ProjectValidator } from "./validator";
import { ProjectPersistence } from "./persistence";

class Controller {
  async create(data: IProjectCreate) {
    // validates input parameters
    ProjectValidator.validateProjectCreateObject(data);

    // checks for idempotency
    await ProjectPersistence.checkIfProjectAlreadyExists(data.project_name);

    // once all the validations are working, creates new project and environment
    const responseData = await ProjectPersistence.createNew(data);

    return responseData;
  }
}

export const ProjectController = new Controller();
