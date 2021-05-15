const express = require("express");
const connectDB = require("./config/db");
const Authenticate = require("./src/routes/Authenticate");
const app = express();

//connect to db
connectDB();

//MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//All the major Routes listed
app.use("/api/productDemo/auth", Authenticate);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is up and running on PORT ${PORT}`)
});