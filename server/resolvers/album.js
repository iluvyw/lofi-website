const model = require("../models");
const { Model } = require("mongoose");

module.exports = {
  findAlbum: async (req, res) => {
    try {
      let { id } = req.body;

      const album = await model.Album.findById(id);

      return res.json({
        status: 1,
        data: album,
      });
    } catch (error) {
      return res.json({
        status: 0,
        message: "Unexpected error occurred.",
      });
    }
  },
  indexAlbum: async (req, res) => {
    try {
      let { name } = req.body;

      const albums = await model.Album.find({
        name: { $regex: name, $options: "i" },
      }).limit(15);

      return res.json({
        status: 1,
        data: albums,
      });
    } catch (error) {
      return res.json({
        status: 0,
        message: "Unexpected error occurred.",
      });
    }
  },
};
