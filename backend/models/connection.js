const mongoose = require("mongoose")
const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;
mongoose.set("strictQuery", true)

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Successfully connected to the Tablée Database 🥳 !"))
  .catch((errorMessage) => console.error(errorMessage))