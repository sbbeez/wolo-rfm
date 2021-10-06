import { IMetadata } from "./additionalAttributes";

export interface IProject extends IMetadata {
  project_name: string;
  project_description: string;
}
