import { DBInstance } from "../../database";
import { IProjectCreate } from "./type";
import EnvironmentPersistence from "../environment/persistence";

const { dbInstance } = DBInstance;

class Persistence {
  createNew = async (projectData: IProjectCreate) => {
    // creates transactions to make sure project + environment is created
    const trx = await dbInstance.transaction();
    try {
      const projectResult = await dbInstance("project")
        .insert({
          name: projectData.project_name,
          description: projectData.project_description,
        })
        .returning(["id as project_id"])
        .transacting(trx);

      const resultData = { ...projectResult[0] };

      // initiating transcation for environment
      resultData["environment"] = await EnvironmentPersistence.createList(
        projectData.environment,
        resultData.project_id,
        trx
      );
      trx.commit();
      return resultData;
    } catch (err) {
      trx.rollback();
      throw [err];
    }
  };

  checkIfProjectAlreadyExists = async (project_name: string) => {
    const data = await dbInstance<{ id: string }>("project")
      .select("id")
      .where(dbInstance.raw("LOWER(name) = ?", project_name.toLowerCase()));

    if (data.length >= 1) {
      throw [
        {
          error_type: "idempotent_error",
          error_reason: `project_name ${project_name} already exists, Please choose a unique one.`,
        },
      ];
    }
    return false;
  };
}

export const ProjectPersistence = new Persistence();
