const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
  },
  backgrounds: [
    {
      type: String,
    },
  ],
  songs: [
    {
      type: String,
    },
  ],
});

const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
