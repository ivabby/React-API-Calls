import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);

  //  Get Request to fetch data from API
  //  We can put async in function to remove then and instead
  //  use await variable
  async function fetchMoviesHandler() {
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
  }

  let content = <p>Found no movies.</p>
  if(movies.length > 0) {
    content = <MoviesList movies={movies}/>
  }
  if(errorState) {
    content = <p>{errorState}</p>
  }
  if(isLoading) {
    content = <p>Loading...</p>
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
