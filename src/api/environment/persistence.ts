import { Knex } from "knex";
import { DBInstance } from "../../database";
import { IEnvPersistence } from "./type";

const { dbInstance } = DBInstance;

class EnvironmentPersistence {
  createList = async (
    environmentLists: IEnvPersistence[],
    project_id: number,
    trx?: Knex.Transaction
  ) => {
    const environmentInsertData = environmentLists.map((item) => ({
      project_id,
      ...item,
    }));

    const environmentCreateQuery = dbInstance("environment")
      .insert(environmentInsertData)
      .returning(["id as environment_id"]);

    if (trx) {
      environmentCreateQuery.transacting(trx);
    }

    const environmentResult = await environmentCreateQuery;

    return environmentResult;
  };
}

export default new EnvironmentPersistence();
