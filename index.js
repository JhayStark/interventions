const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { dbConnect } = require("./config/dbConnect");
const authRouter = require("./modules/users/auth.route");
const userRouter = require("./modules/users/users.route");


dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Interventions API");
});

//  routes
app.use("/auth", authRouter);
app.use("/users", userRouter);

async function start() {
  await dbConnect();

  app.listen(4000, (err) => {
    if (err) {
      console.error("Error starting the server:", err);
      return;
    }
    console.log("Server listening on http://localhost:4000");
  });
}

start();
