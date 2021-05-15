const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect to db
connectDB();

app.get("/", (req, res) => { res.send("API is running") });
console.log("change")
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is up and running on PORT ${PORT}`)
});