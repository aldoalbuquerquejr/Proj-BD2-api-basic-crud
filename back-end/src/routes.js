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
routes.post("/movies", createMovie);
routes.delete("/movies/:id", deleteMovie);
routes.patch("/movies/:id", updateMovie);
routes.get("/movies/:id", getMovieById);

export default routes;
