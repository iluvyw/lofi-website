// .env config file
require("dotenv").config();

// Connect to MongoDB host
const DB_HOST = process.env.DB_HOST;
const db = require("./db");
db.connect(DB_HOST);

// Express app.
const express = require("express");
const app = express();

// Help parse request's json body into req.body.
// Note: Header's content-type must be 'application/json'
app.use(express.json());

// Security and CORS
const helmet = require("helmet");
const cors = require("cors");
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend");
});

// Define all router.
const routers = require("./routers");
app.use("/user", routers.userRouter);
app.use("/album", routers.albumRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
