const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnnection = require("express-myconnection");

const app = express();

//IMPORTING ROUTES
const customerRoutes = require("./routes/customer");
const { urlencoded } = require("express");

//SETTINGS
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//MIDDLEWARES
app.use(morgan("dev"));
app.use(myConnnection(mysql, {
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "crudnodejsmysql"
}, "single"));
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use("/", customerRoutes);


//STATICS FILES
app.use(express.static(path.join(__dirname, "public")));

//STARTING SERVER
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
}); 