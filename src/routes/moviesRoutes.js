const controller = require("../controllers/moviesController");
const express = require("express");

const router = express.Router();

router.get("/", controller.home);
router.get("/all", controller.getAll);
router.post("/create", controller.createMovie);
router.patch("/update/:id", controller.updateMovieById);
router.delete("/delete/:id", controller.deleteMovieById);
router.get("/ghibli/", controller.getAllStudioGhibli);

module.exports = router;