import { IEnvironment, IProject } from "../../type";

export interface IProjectCreate extends IProject {
  environemnt: IEnvironment[];
}
