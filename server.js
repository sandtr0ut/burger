const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Import Routes and Let the Server Use Them
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

app.listen(PORT, () => console.log(`App listensing on PORT ${PORT}...`));
