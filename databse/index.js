const mongoose = require("mongoose");
mongoose
  .connect(
    // "mongodb://127.0.0.1:27017"
    "mongodb+srv://ahmedarts817:253461@cluster0.n9exzh7.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to db"));
