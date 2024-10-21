import { Router } from "express";
import {
  getMovies,
  createMovie,
  deleteMovie,
  updateMovie,
  getMovieById,
} from "./controllers/MovieController.js";

const routes = Router();
routes.get("/movies", getMovies);
routes.get("/movies/:id", getMovieById);
routes.post("/movies", createMovie);
routes.patch("/movies/:id", updateMovie);
routes.delete("/movies/:id", deleteMovie);

export default routes;
