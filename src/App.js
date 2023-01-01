import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //  Get Request to fetch data from API
  //  We can put async in function to remove then and instead
  //  use await variable
  async function fetchMoviesHandler() {
    setIsLoading(true);
    //  Using await to make it synchronous
    const response = await fetch("https://swapi.dev/api/films");

    const data = await response.json();

    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        releaseData: movieData.release_date,
        openingText: movieData.opening_crawl,
      };
    });

    setMovies(transformedMovies);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
