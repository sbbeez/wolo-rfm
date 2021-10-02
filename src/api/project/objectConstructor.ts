/**
 * This module accepts express request object and constructs required params for each route.
 * Each method corresponds to different routes.
 * Acts as a middleware to construct the object required by each object.
 * Once the object is constructed from request, invokes other middlewares if any.
 */
// external modules installed using npm
import * as Express from "express";

// internal modules
import { ProjectValidator } from "./validator";

class ObjectConstructor {
  async create(request: Express.Request, response: Express.Response) {
    const responseData = await ProjectValidator.create(request.body);
    response.send(responseData);
  }
}

export const ProjectObjectConstructor = new ObjectConstructor();
