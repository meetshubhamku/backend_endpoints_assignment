const express = require("express");
const dbConnection = require("./db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
require("dotenv").config();

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//Default route
app.get("/", function (req, res) {
  res.send("Hello World!");
});

// listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
