import Movie from "../models/Movie.js";
import logger from "../logger/Logger.js";

async function getMovies(request, response) {
  let register = "";
  try {
    const movies = await Movie.find();
    register = movies;
    if(register != '') {
      logger.info("Success on getting all users!")
    }
  }catch(error) {
    logger.error("Couldn't get all users")
  }
  return response.status(200).json(register);
}

async function getMovieById(request, response) {
  const id = request.params.id;
  const movie = await Movie.findById({ _id: id });
  return response.status(200).json(movie);
}

async function createMovie(request, response) {
  const movie = request.body;
  const newMovie = await Movie.create(movie);
  return response
    .status(201)
    .json({ response: "Movie has been sucessfuly created!", newMovie });
}

async function deleteMovie(request, response) {
  const id = request.params.id;
  await Movie.findByIdAndDelete({ _id: id });
  return response
    .status(200)
    .json({ response: "Movie has been sucessfuly deleted!" });
}

async function updateMovie(request, response) {
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
    return response
      .status(400)
      .json({ response: "Movie has not been found!", error: error.message });
  }
  return response
    .status(200)
    .json({ response: "Movie has been sucessfuly updated!" });
}

export { getMovies, createMovie, deleteMovie, updateMovie, getMovieById };
