class Controller {
  async create(data: any) {
    console.log("database", data);
    return data;
  }
}

export const ProjectController = new Controller();
