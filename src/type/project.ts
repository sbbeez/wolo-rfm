import { IMetadata } from "./common";

export interface IProject extends IMetadata {
  project_name: string;
  project_description: string;
}
