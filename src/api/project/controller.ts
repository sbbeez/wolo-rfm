/**
 * Controller will be the core module
 * invokes validation
 * invokes object creation (converting from API input / batch job input / cli input) to persistence required object
 * checks for idempotency
 */
import { IProjectCreate } from "./type";
import { ProjectValidator } from "./validator";
import { ProjectPersistence } from "./persistence";
import { ProjectObjectConstructor } from "./objectConstructor";

class Controller {
  async create(data: IProjectCreate) {
    // validates input parameters
    ProjectValidator.validateProjectCreateInput(data);

    const projectCreateObj =
      ProjectObjectConstructor.projectCreateNewPersistence(data);

    // checks for idempotency
    const projectData = await ProjectPersistence.checkIfProjectAlreadyExists(
      projectCreateObj.name
    );

    // if same project name already exists throws an idempotency error
    if (projectData.length >= 1) {
      throw [
        {
          error_type: "idempotent_error",
          error_reason: `project_name "${projectCreateObj.name}" already exists, Please choose a unique name.`,
        },
      ];
    }

    // once all the validations are working, creates new project and environment
    const responseData = await ProjectPersistence.createNew(projectCreateObj);

    return responseData;
  }
}

export const ProjectController = new Controller();
