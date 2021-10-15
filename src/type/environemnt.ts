import { IMetadata } from "./common";

export interface IEnvironment extends IMetadata {
  environment_name: string;
  environment_description: string;
  environment_key: string;
}
