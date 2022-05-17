const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  albums: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Album",
    },
  ],
  learnTime: [
    {
      type: String,
    },
  ],
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
