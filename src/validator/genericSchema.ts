export const descriptionSchema = {
  $id: "schema/desc",
  definitions: {
    desc: { type: "string", nullable: true, maxLength: 500 },
  },
};

export const keySchema = {
  $id: "schema/key",
  definitions: {
    key: {
      type: "string",
      minLength: 3,
      maxLength: 20,
      pattern: "^[A-Za-z][A-Za-z0-9\\.\\-_]+[A-Za-z0-9]+$",
    },
  },
};

export const nameSchema = {
  $id: "schema/name",
  definitions: {
    name: {
      type: "string",
      minLength: 3,
      maxLength: 100,
      pattern: "^[A-Za-z][A-Za-z0-9\\.\\s\\-_]+[A-Za-z0-9]+$",
    },
  },
};
