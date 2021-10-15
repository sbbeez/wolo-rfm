/**
 * Focued only to do transformations
 */

import { IProjectCreate, IProjectCreatePersistence } from "./type";

class ObjectConstructor {
  projectCreateNewPersistence = (
    projectData: IProjectCreate
  ): IProjectCreatePersistence => {
    return {
      name: projectData.project_name,
      description: projectData.project_description,
      environment: projectData.environment.map((item) => {
        return {
          name: item.environment_name,
          key: item.environment_key,
          description: item.environment_description,
        };
      }),
    };
  };
}

export const ProjectObjectConstructor = new ObjectConstructor();
