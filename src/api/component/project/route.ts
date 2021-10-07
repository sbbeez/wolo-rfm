import { Router as ExpressRouter } from "express";
import { ProjectObjectConstructor } from "./objectConstructor";

export class Router {
  router = ExpressRouter();

  constructor() {
    this.router.post("/create", ProjectObjectConstructor.create);
  }
}

export const ProjectRouter = new Router();
