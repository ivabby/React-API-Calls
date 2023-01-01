import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);

  //  Get Request to fetch data from API
  //  We can put async in function to remove then and instead
  //  use await variable
  const fetchMoviesHandler = useCallback(async () => {
    // async function fetchMoviesHandler() {
    setIsLoading(true);
    setErrorState(null);

    //  Using await to make it synchronous
    // Handling Errors when calling API's
    //  If using async await we use try catch block
    try {
      const response = await fetch("https://swapi.dev/api/films");
      //  Checking if response is containing error
      //  We can also check HTTP Status Code
      //  But then we need to check manually all the codes which will
      //  increase the code to be written
      if (!response.ok) {
        throw new Error(`Something went wrong`);
      }

      //  Converting response into JSON to parse it
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
    } catch (error) {
      setErrorState(error.message);
    }
    setIsLoading(false);
    // }
  }, []);
  /**
   * We don't pass any dependencies as this function don't depend on any
   * external dependencies. If we have some dependencies we will have defined it
   * here.
   */

  //  As soon as web page loads we call the API to load movies
  //  This is a good practice which is used in modern application.
  //  This will run only once when the APP components loads in browser =
  //  It will not re-render on change in the state
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  /**
   * In useEffect we need to pass dependencies
   * but it will result into infinite loop
   * because functions are object and it points to reference and as soon as any
   * state changes useEffect will be called again and again
   * Solution -
   * 1. We can omit and pass empty dependency array
   * 2. Wrap fetchMoviesHandler using useCallback Hook
   */

  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (errorState) {
    content = <p>{errorState}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && errorState && <p>{errorState}</p>}
        {!isLoading && !errorState && movies.length === 0 && (
          <p>Found no movies.</p>
        )}
        {isLoading && <p>Loading....</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
