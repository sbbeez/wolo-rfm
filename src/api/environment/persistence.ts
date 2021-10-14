import { Knex } from "knex";
import { IEnvironment } from "type";
import { DBInstance } from "../../database";

const { dbInstance } = DBInstance;

class EnvironmentPersistence {
  createList = async (
    environmentLists: IEnvironment[],
    project_id: number,
    trx?: Knex.Transaction
  ) => {
    const environmentInsertData = environmentLists.map((item) => ({
      project_id,
      name: item.environment_name,
      description: item.environment_description,
      key: item.environment_key,
    }));


    const environmentCreateQuery = dbInstance("environment")
      .insert(environmentInsertData)
      .returning(["id as environment_id"]);

    if (trx) {
      environmentCreateQuery.transacting(trx);
    }

    const environmentResult = await environmentCreateQuery;

    console.log(environmentResult);

    return environmentResult;
  };
}

export default new EnvironmentPersistence();
