require("dotenv").config();

const requiredEnvConfig = [
  "PG_DB_HOST",
  "PG_DB_PORT",
  "PG_DB_USER",
  "PG_DB_PASSWORD",
];

export enum EnvConfigTypes {
  PG_DB_HOST = "PG_DB_HOST",
  PG_DB_PORT = "PG_DB_PORT",
  PG_DB_USER = "PG_DB_USER",
  PG_DB_PASSWORD = "PG_DB_PASSWORD",
}

class EnvConfiguration {
  constructor() {
    this._verifyRequiredEnvConfig();
  }
  _verifyRequiredEnvConfig = () => {
    try {
      requiredEnvConfig.map((item) => {
        if (!process.env[item]) {
          throw {
            error_type: "missing_configuration",
            error_path: item,
          };
        }
      });
    } catch (err) {
      if (err.error_type === "missing_configuration") {
        console.log(err);
        process.exit(1);
      }
    }
  };

  getEnvValue = (key: EnvConfigTypes): string | number | undefined => {
    return process.env[key];
  };
}

export default new EnvConfiguration();
