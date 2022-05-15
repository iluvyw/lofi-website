const express = require("express");
const albumRouter = express.Router();
const albumResolver = require("../resolvers/album");

albumRouter.post("/find_album", albumResolver.findAlbum);
albumRouter.post("/index_album", albumResolver.indexAlbum);

module.exports = albumRouter;
