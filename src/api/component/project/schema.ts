import { environmentSchema } from "../environment";

export const projectCreateSchema = {
  $id: "schema/project",
  type: "object",
  properties: {
    project_name: { $ref: "name#/definitions/name" },
    project_description: { $ref: "desc#/definitions/desc" },
    environment: {
      type: "array",
      items: environmentSchema,
      minItems: 1,
    },
  },
  required: ["project_name", "project_description", "environment"],
  additionalProperties: false,
};
