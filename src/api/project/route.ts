/**
 * This class handles request, transform data from different types (body, header, params, query)
 * Also responsible for the list of APIs exposed via the router
 */
import * as Express from "express";
import { Router as ExpressRouter } from "express";

// internal modules
import { ProjectController } from "./controller";
import { IProjectCreate } from "./type";
import { ErrorHandler } from "../../responseHandler";
export class RequestHandler {
  errorHandler: ErrorHandler;
  requestHandler = ExpressRouter();

  constructor() {
    this.requestHandler.post("/create", this.createNewProject);
    this._setupHandlers();
  }

  _setupHandlers = () => {
    this.errorHandler = new ErrorHandler();
  };

  createNewProject = async (
    request: Express.Request<{}, {}, IProjectCreate>,
    response: Express.Response
  ) => {
    try {
      const data = await ProjectController.create(request.body);
      response.send(data);
    } catch (err) {
      response.send(this.errorHandler.handleError(err));
    }
  };
}

export const ProjectRequestHandler = new RequestHandler();
