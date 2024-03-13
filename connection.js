const mongoose = require("mongoose");
require('dotenv').config();

async function connect() {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
}

module.exports={connect}