import Movie from "../models/Movie.js";
import logger from "../logger/Logger.js";

async function getMovies(request, response) {  //GET
  let register = "";
  try {
    const movies = await Movie.find();
    register = movies;
    if (register != "") {
      logger.info('All movies successfully returned');
    }
  } catch (error) {
    logger.error("Could not get movies");
  }
  return response.status(200).json(register);
}

async function getMovieById(request, response) {  //GET BY ID
  const id = request.params.id;
  let register = "";
  try {
    const movie = await Movie.findById({ _id: id });
    register = movie;
    if (register != "") {
      logger.info('Movie successfully got by ID');
    }
  } catch (error) {
    logger.error("Could not get movie by id");
    return response.status(400).json({ response: "Movie has not been found!" });
  }

  return response.status(200).json(register);
}

async function createMovie(request, response) {  //POST
  const movie = request.body;
  let register = "";
  try {
    register = await Movie.create(movie);
    if (register != "") {
      logger.info("Movie has been successfully added");
    }
  } catch (error) {
    logger.error("Could not add movie");
    return response
      .status(400)
      .json({ response: "Movie has not been added!", error: error.message });
  }
  return response
    .status(201)
    .json({ response: "Movie has been sucessfuly added!", register });
}

async function updateMovie(request, response) {  //PUT/PATCH
  const id = request.params.id;
  const { title, year, genre } = request.body;
  const updatedMovie = {
    title,
    year,
    genre,
  }
  try {
    await Movie.findByIdAndUpdate(
      { _id: id },
      { $set: updatedMovie },
      { new: true }
    )
  } catch (error) {
    logger.error("Could not update movie");
    return response
      .status(400)
      .json({ response: "Movie has not been found!", error: error.message });
  }
  logger.info('Movie has been successfully updated');
  return response
    .status(200)
    .json({ response: "Movie has been sucessfuly updated!" });
}

async function deleteMovie(request, response) {  //DELETE
  const id = request.params.id;
  try {
    await Movie.findByIdAndDelete({ _id: id });
  } catch (error) {
    logger.error("Could not delete movie");
    return response
      .status(400)
      .json({ response: "Movie has not been found!", error: error.message });
  }
  logger.info('Movie has been successfully deleted');
  return response
    .status(200)
    .json({ response: "Movie has been sucessfuly deleted!" });
}

export { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
