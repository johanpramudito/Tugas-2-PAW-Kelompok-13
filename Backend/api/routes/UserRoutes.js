const UserRouter = require("express").Router();

const { createUser, loginUser } = require("../controllers/postController");
const { deleteUser } = require("../controllers/deleteController") 
const { updateUser } = require("../controllers/putController");
const { getAllUsers, getUserByName } = require("../controllers/getController");

UserRouter.post('/login', loginUser); 
UserRouter.post("/createUser", createUser);
UserRouter.put("/updateUser/:id", updateUser);
UserRouter.delete("/deleteUser/:id", deleteUser);
UserRouter.get("/", getAllUsers); // Untuk GET /users
UserRouter.get("/:name", getUserByName); // Untuk GET /users/:title

module.exports = UserRouter;