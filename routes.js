const ApplicationController = require("./controllers/applications");
const UserController = require("./controllers/users");
const isAuthenticated = require("./config/middleware/isAuthenticated");
const validationCheck = require("./config/middleware/validationCheck");

module.exports = (app) => {
  // User End Points
  app.get("/allUsers", isAuthenticated, UserController.allUsers);
  app.get("/user/:id", isAuthenticated, UserController.getUser);
  app.post("/register", validationCheck.register, UserController.register);
  app.post("/login", UserController.login);
  app.delete("/delete/user/:id", isAuthenticated, UserController.deleteUser);
  app.put("/updateInformation/user/:id", isAuthenticated, UserController.updateUserInfo);
  // TO BE IMPLEMENTED
  app.put("/updatePassword/user/:id", isAuthenticated, UserController.updatePassword);

  // Application End Points
  app.get("/applications", isAuthenticated, ApplicationController.allApplications);
  app.get("/applications/user/:UserId", isAuthenticated, ApplicationController.allApplicationsById);
  app.get("/applications/user/:UserId/status/:status", isAuthenticated, ApplicationController.showApplicationStatus);
  app.put("/application/:id", isAuthenticated, ApplicationController.updateApplication);
  app.post("/application", isAuthenticated, ApplicationController.createApplication);
  app.delete("/application/delete/:id", isAuthenticated, ApplicationController.deleteApplication);
};
