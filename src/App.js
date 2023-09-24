import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  function fetchMovies() {
    const loadedMovies = [];
    fetch('https://mock-http-default-rtdb.firebaseio.com/movies.json').then(res => {
      return res.json();
    }).then(data => {

      for (let key in data) {
        loadedMovies.push(
          {
            id: key,
            title: data[key].title,
            releaseDate: data[key].releaseDate,
            openingText: data[key].openingText
          }
        )
      }
      setMovies(loadedMovies);
    })
  }

  async function addMovieHandler(movie) {
    const res = await fetch('https://mock-http-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
