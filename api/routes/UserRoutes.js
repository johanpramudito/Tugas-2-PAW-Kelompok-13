const UserRouter = require("express").Router();

const { createUser } = require("../controllers/postController");
const { deleteUser } = require("../controllers/deleteController") 
const { updateUser } = require("../controllers/updateController");

UserRouter.post("/createUser", createUser);
// UserRouter.get("/read", readUser);
UserRouter.put("/updateUser/:id", updateUser);
UserRouter.delete("/deleteUser/:id", deleteUser);

module.exports = UserRouter;