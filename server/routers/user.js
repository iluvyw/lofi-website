const express = require("express");
const getUser = require("../middleware");
const userRouter = express.Router();
const userResolver = require("../resolvers/user");

userRouter.get("/", getUser, userResolver.me);
userRouter.post("/signup", userResolver.signUp);
userRouter.post("/signin", userResolver.signIn);
userRouter.post("/update", getUser, userResolver.updateUser);
userRouter.post("/create_album", getUser, userResolver.createAlbum);
userRouter.post("/remove_album", getUser, userResolver.removeAlbum);
userRouter.post("/update_album", getUser, userResolver.updateAlbum);

module.exports = userRouter;
