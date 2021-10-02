import * as express from "express";

class App {
  public static start() {
    const app = express();
    app.get("/health-check", (request, response) => {
      response.send({
        message: "Hey bro!! its up..,,,,",
      });
    });
    app.listen(3000);
  }
}

App.start();
