const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHander = require("./middlewares/error");
const connectDB = require("./config/db");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

//Route files
const categories = require("./routes/categories");
const products = require("./routes/products");

const app = express();

// Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/categories", categories);
app.use("/api/v1/products", products);

// Middlewares are linear. It must appear after all the routes that need it have been mounted
app.use(errorHander);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandles promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
