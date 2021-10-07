export const environmentSchema = {
  $id: "environment",
  type: "object",
  properties: {
    environment_name: { $ref: "name#/definitions/name" },
    environment_key: { $ref: "key#/definitions/key" },
    environment_description: { $ref: "desc#/definitions/desc" },
  },
  required: ["environment_name", "environment_key"],
  additionalProperties: false,
};
