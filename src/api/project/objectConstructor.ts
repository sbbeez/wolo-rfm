/**
 * This module accepts express request object and constructs required params for each route.
 * Each method corresponds to different routes.
 * Acts as a middleware to construct the object required by each object.
 * Once the object is constructed from request, invokes other middlewares if any.
 */
// external modules installed using npm
import * as Express from "express";

// internal modules
import { ProjectController } from "./controller";
import { IProjectCreate } from "./type";
import { ErrorHandler } from "../../responseHandler";

class ObjectConstructor {
  errorHandler: ErrorHandler;

  constructor() {
    this.errorHandler = new ErrorHandler();
  }

  create = async (
    request: Express.Request<{}, {}, IProjectCreate>,
    response: Express.Response
  ) => {
    try {
      const data = await ProjectController.create(request.body);
      response.send(data);
    } catch (err) {
      response.send(this.errorHandler.handleValidationErrors(err));
    }
  };
}

export const ProjectObjectConstructor = new ObjectConstructor();
