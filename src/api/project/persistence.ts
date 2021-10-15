import { DBInstance } from "../../database";
import { IProjectCreatePersistence } from "./type";
import EnvironmentPersistence from "../environment/persistence";

const { dbInstance } = DBInstance;

class Persistence {
  createNew = async (projectData: IProjectCreatePersistence) => {
    // creates transactions to make sure project + environment is created
    const trx = await dbInstance.transaction();
    try {
      const projectResult = await dbInstance("project")
        .insert({
          name: projectData.name,
          description: projectData.description,
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

  checkIfProjectAlreadyExists = async (name: string) => {
    const data = await dbInstance<{ id: string }>("project")
      .select("id")
      .where(dbInstance.raw("LOWER(name) = ?", name.toLowerCase()));

    return data;
  };
}

export const ProjectPersistence = new Persistence();
