// common module imports
import * as Express from "express";

// internal module imports
import { ProjectRequestHandler } from "./api/project/route";

class App {
  expressApp: Express.Application;

  constructor() {
    this.expressApp = Express();
  }

  public configureRouter() {
    this.expressApp.use("/project", ProjectRequestHandler.requestHandler);
  }

  public configureLogger() {}

  public configureCluster() {}

  public intialize() {
    this.expressApp.use(Express.json());
    this.configureRouter();
  }

  public startListener() {
    this.expressApp.listen(3000);
  }
}

const MainApp = new App();
MainApp.intialize();
MainApp.startListener();
