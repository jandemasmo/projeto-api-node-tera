const express = require("express");
const app = express();

const mongoose = require("../config/database")

const cors = require("cors");
const moviesRoutes = require("./routes/moviesRoutes");

app.use(cors());

app.use(express.json());

//definir rota principal da aplicação
app.use("/movies", moviesRoutes )

module.exports = app
