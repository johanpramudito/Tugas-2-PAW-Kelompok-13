const UserRouter = require("express").Router();

const { createUser } = require("../controllers/postController");
const { deleteUser } = require("../controllers/deleteController") 
const { getAllUsers, getUserByName } = require("../controllers/getController");


UserRouter.post("/createUser", createUser);
UserRouter.get("/", getAllUsers); // Untuk GET /users
UserRouter.get("/:name", getUserByName); // Untuk GET /users/:title
// UserRouter.put("/update/:id", updateUser);
UserRouter.delete("/deleteUser/:id", deleteUser);

module.exports = UserRouter;