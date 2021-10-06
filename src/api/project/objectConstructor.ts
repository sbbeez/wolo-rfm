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

class ObjectConstructor {
  async create(
    request: Express.Request<{}, {}, IProjectCreate>,
    response: Express.Response
  ) {
    try {
      await ProjectController.create(request.body);
      response.send("success");
    } catch (err) {
      console.log(err);
      response.send("error occured");
    }
  }
}

export const ProjectObjectConstructor = new ObjectConstructor();
