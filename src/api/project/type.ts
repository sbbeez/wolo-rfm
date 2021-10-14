import { IEnvironment, IProject } from "../../type";

export interface IProjectCreate extends IProject {
  environment: IEnvironment[];
}

export interface IProjectPersistence {
  name: string;
  description: string;
}
