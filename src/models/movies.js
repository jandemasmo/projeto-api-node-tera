const mongoose = require("mongoose");
let moviesSchema = new mongoose.Schema({
    addedAt: {type: Date, default: Date.now},
    title: String,
    genre: String

});

module.exports = mongoose.model("Movies", moviesSchema);