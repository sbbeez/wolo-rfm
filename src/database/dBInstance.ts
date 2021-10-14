import { Knex, knex } from "knex";
import { EnvConfigTypes, EnvConfig } from "../configuration";

class DBInstance {
  dbInstance: Knex;
  constructor() {
    this.dbInstance = knex({
      client: "pg",
      connection: {
        host: EnvConfig.getEnvValue(EnvConfigTypes.PG_DB_HOST) as string,
        port: EnvConfig.getEnvValue(EnvConfigTypes.PG_DB_PORT) as number,
        user: EnvConfig.getEnvValue(EnvConfigTypes.PG_DB_USER) as string,
        password: EnvConfig.getEnvValue(
          EnvConfigTypes.PG_DB_PASSWORD
        ) as string,
        database: "postgres",
      },
      pool: { min: 1, max: 7 },
    });
  }
}

export default new DBInstance();
