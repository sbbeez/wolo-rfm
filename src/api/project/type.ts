import { ICommonModel, ICommonModelKey } from "../../type/common";
import { IEnvironment, IProject } from "../../type";

// Controller layer types
export interface IProjectCreate extends IProject {
  environment: IEnvironment[];
}

// Persistence layer types
interface IEnvPersistence extends ICommonModel, ICommonModelKey {}
export interface IProjectCreatePersistence extends ICommonModel {
  environment: IEnvPersistence[];
}
