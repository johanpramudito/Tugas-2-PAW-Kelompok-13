const UserRouter = require("express").Router();

const { createUser } = require("../controllers/postController");
const { deleteUser } = require("../controllers/deleteController") 

UserRouter.post("/createUser", createUser);
// UserRouter.get("/read", readUser);
// UserRouter.put("/update/:id", updateUser);
UserRouter.delete("/deleteUser/:id", deleteUser);

module.exports = UserRouter;