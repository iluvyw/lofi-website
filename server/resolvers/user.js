const model = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Model } = require("mongoose");

module.exports = {
  me: async (req, res) => {
    try {
      const user = await model.User.findById(req.user.id);
      if (!user) {
        return res.json({
          status: 0,
          message: "Not valid user.",
        });
      }

      user.password = undefined;
      user.ignored_list = undefined;

      var albumList = [];
      for (var i = 0; i < user.albums.length; i++) {
        const album = await model.Album.findById(user.albums[i]);
        albumList.push(album);
      }
      user.albumList = albumList;

      return res.json({
        status: 1,
        data: user,
      });
    } catch (error) {
      return res.json({
        status: 0,
        message: "Unexpected error occurred.",
      });
    }
  },
  signUp: async (req, res) => {
    let { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.json({
        status: 0,
        message: "Not enough information.",
      });
    }
    email = email.trim().toLowerCase();
    var re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      return res.json({
        status: 0,
        message: "Not a valid email",
      });
    }
    const emailExist = await model.User.findOne({ email });
    if (emailExist) {
      return res.json({
        status: 0,
        message: "Email is already signed up.",
      });
    }

    if (password.length < 6) {
      return res.json({
        status: 0,
        message: "Password is too short.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = new model.User({
        fullname,
        email,
        password: hashedPassword,
      });

      await user
        .save()
        .then((doc) => {
          console.log(doc);
        })
        .catch((err) => {
          console.error(err);
        });

      user.password = undefined;
      user.ignored_list = undefined;

      return res.json({
        status: 1,
        message: "Signed up successfully.",
        data: {
          token: jwt.sign(
            {
              id: user._id,
            },
            process.env.JWT_SECRET
          ),
          user,
        },
      });
    } catch (error) {
      return res.json({
        status: 0,
        message: "Unexpected error.",
      });
    }
  },
  signIn: async (req, res) => {
    let { email, password } = req.body;

    const user = await model.User.findOne({ email });

    if (!user) {
      return res.json({
        status: 0,
        message: "User does not exist.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({
        status: 0,
        message: "Wrong password.",
      });
    }

    user.password = undefined;
    user.ignored_list = undefined;

    return res.json({
      status: 1,
      message: "Signed in successfully.",
      data: {
        token: jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET
        ),
        user,
      },
    });
  },
  updateUser: async (req, res) => {
    const user = await model.User.findById(req.user.id);
    if (!user) {
      return res.json({
        status: 0,
        message: "Not valid user.",
      });
    }

    let { learnTime, fullname } = req.body;
    learnTime = learnTime ? learnTime : user.learnTime;
    fullname = fullname ? fullname : user.fullname;

    try {
      const updatedUser = await model.User.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $set: {
            learnTime: learnTime,
            fullname: fullname,
          },
        },
        {
          new: true,
        }
      );

      updatedUser.password = undefined;
      updatedUser.ignored_list = undefined;

      return res.json({
        status: 1,
        message: "Updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      return res.json({
        status: 0,
        message: "Error",
      });
    }
  },
  createAlbum: async (req, res) => {
    const user = await model.User.findById(req.user.id);
    if (!user) {
      return res.json({
        status: 0,
        message: "Not valid user.",
      });
    }
    let { name, songs, backgrounds } = req.body;
    if (!name || !songs || !backgrounds) {
      return res.json({
        status: 0,
        message: "Not enough info.",
      });
    }
    try {
      const album = new model.Album({
        owner: user._id,
        name,
        songs,
        backgrounds,
      });

      await album.save();

      await model.User.findByIdAndUpdate(user._id, {
        $push: {
          albums: album._id,
        },
      });

      return res.json({
        status: 1,
        message: "Successfully create an album",
        data: album,
      });
    } catch (error) {
      return res.json({
        status: 0,
        message: "Error.",
      });
    }
  },
  removeAlbum: async (req, res) => {
    const user = await model.User.findById(req.user.id);
    if (!user) {
      return res.json({
        status: 0,
        message: "Not valid user.",
      });
    }
    let { id } = req.body;
    const album = await model.Album.findById(id);
    if (!album) {
      return res.json({
        status: 0,
        message: "Cannot find album.",
      });
    }
    try {
      if (album.owner.equals(user._id)) {
        await model.Album.deleteOne({ _id: album._id });
      }
      const updatedUser = await model.User.findByIdAndUpdate(
        user._id,
        {
          $pull: {
            albums: album._id,
          },
        },
        {
          new: true,
        }
      );

      updatedUser.password = undefined;
      updatedUser.ignored_list = undefined;

      return res.json({
        status: 1,
        message: "Successfully remove album.",
        data: updatedUser,
      });
    } catch (error) {
      return res.json({
        status: 0,
        message: "Error in removing album." + error,
      });
    }
  },
  updateAlbum: async (req, res) => {
    const user = await model.User.findById(req.user.id);
    if (!user) {
      return res.json({
        status: 0,
        message: "Not valid user.",
      });
    }
    let { id, name, songs, backgrounds } = req.body;
    let flag = false;
    for (let i = 0; i < user.albums.length; i++)
      if (user.albums[i] == id) {
        flag = true;
        break;
      }
    const album = await model.Album.findById(id);
    if (!album || !flag) {
      return res.json({
        status: 0,
        message: "Not valid album.",
      });
    }
    name = name ? name : album.name;
    songs = songs ? songs : album.song;
    backgrounds = backgrounds ? backgrounds : album.backgrounds;

    try {
      const updatedAlbum = await model.Album.findOneAndUpdate(
        id,
        {
          $set: {
            name: name,
            songs: songs,
          },
        },
        {
          new: true,
        }
      );

      return res.json({
        status: 1,
        message: "Successfully update an album",
        data: updatedAlbum,
      });
    } catch (error) {
      return res.json({
        status: 0,
        message: "Error.",
      });
    }
  },
};
