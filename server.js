const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
const ApiError = require("./utils/errorApi");
const globalError = require("./middlewares/globalError");
const morgan = require("morgan");
require("./databse");
const categoryRouter = require("./routers/categoryRouter");
const subCategoryRouter = require("./routers/subCategoryRouter");
const brandRouter = require("./routers/brandRouter");

dotenv.config({ paath: ".env" });

if (process.env.ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.ENV}`);
}

app.get("/", (req, res) => {
  res.send("ecoomerce v1");
});

// Mount Routers
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter);

app.all("*", (req, res, next) => {
  //create error and sent it to error handling midleware
  // const err = new Error(`cant find this route ${req.originalUrl}`)
  // next(err.message)
  next(new ApiError("message", 400));
});
//Global Error Handling Middleware
app.use(globalError);

const PORT = process.env.PORT;
const server = app.listen(PORT || 8000, () => {
  console.log("listining");
});
// Handle rejections out express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`app is shut down ....`);
    process.exit(1);
  });
});
