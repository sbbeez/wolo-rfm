/**
 * This module takes responsibility to validate the incoming object
 * Once validated, invokes controller layer to do any business logic
 */

import { ProjectController } from "./controller";
import * as Joi from "joi";
class Validator {
  async create(data: any) {
    return ProjectController.create(data);
  }

  _validateProjectCreateObject() {
    const schema = Joi.object({
      project_name: Joi.string()
        .min(3)
        .max(100)
        .pattern(/^[A-Za-z][A-Za-z0-9.\s\-_]+[A-Za-z0-9]+$/i)
        .required()
        .messages({
          "string.base": "project_name has to be string",
          "string.min": "project_name cannot be less than 3 characters",
          "string.max": "project_name cannot exceed 100 characters",
          "string.pattern.base":
            "project_name can start or end only with character/number, supports only '.', '-', '_' in middle of the characters",
          "string.required": "project_name is a mandatory field",
        }),
      project_description: Joi.string().max(500).optional().messages({
        "string.base": "project_description has to be string",
        "string.max": "project_description cannot exceed 500 characters",
      }),
      environment: Joi.array()
        .min(1)
        .required()
        .messages({
          "array.min":
            "Atleast one environment is required to create a project",
        })
        .items(
          Joi.object({
            environment_name: Joi.string()
              .min(3)
              .max(100)
              .pattern(/^[A-Za-z][A-Za-z0-9.\s\-_]+[A-Za-z0-9]+$/i)
              .required()
              .messages({
                "string.base": "environment_name has to be string",
                "string.max": "environment_name cannot exceed 100 characters",
                "string.min":
                  "environment_name cannot be less than 3 characters",
                "string.pattern.base":
                  "environment_name can start or end only with character/number, supports only '.', '-', '_' in middle of the characters",
                "string.required": "environment_name is a mandatory field",
              }),
            environment_description: Joi.string().max(500).optional().messages({
              "string.base": "environment_name has to be string",
              "string.max": "environment_name cannot exceed 500 characters",
            }),
            environment_key: Joi.string()
              .min(3)
              .max(20)
              .pattern(/^[A-Za-z][A-Za-z0-9\.\-\_]+[A-Za-z0-9]+$/i)
              .required()
              .messages({
                "string.base": "environment_key has to be string",
                "string.min":
                  "environment_key cannot be less than 3 characters",
                "string.max": "environment_key cannot exceed 20 characters",
                "string.pattern.base":
                  "environment_key can start or end only with character/number, supports only '.', '-', '_' in middle of the characters",
                "string.required": "environment_key is a mandatory field",
              }),
          })
        ),
    });
    schema.validate({});
  }
}

export const ProjectValidator = new Validator();
