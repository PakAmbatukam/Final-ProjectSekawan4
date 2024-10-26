import React, { useEffect, useState } from 'react';
import './GenreFilter.css';
import { Link } from 'react-router-dom';

const GenreFilter = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(28); // Set default to Action genre
  const [genres, setGenres] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQ0YjM3M2U2MmY2Yjc1N2I5NDdjZDhjZWQxN2Q0OCIsIm5iZiI6MTcyOTgzODYwMy41NTgyMzgsInN1YiI6IjY2ZGZjMmE2YTljYTIwMzE0OWYxYmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvL2QqZXMctok_UEvSNbrcUMG_WfjCI_EqVjlVr3nnM', // Ganti dengan API key Anda
    },
  };

  // Fetch genres on initial render
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', options)
      .then(response => response.json())
      .then(response => {
        setGenres(response.genres);
        fetchMovies(28); // Ganti dengan ID genre Action
      })
      .catch(err => console.error(err));
  }, []);

  // Fetch movies based on the selected genre
  useEffect(() => {
    if (selectedGenre) {
      fetchMovies(selectedGenre);
    }
  }, [selectedGenre]);

  const fetchMovies = (genreId) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1>Filter Genre Movies</h1>
      <div className="genre-buttons">
        {genres.map(genre => (
          <button
            key={genre.id}
            className="genre-button"
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <div className="movie-grid">
        {apiData.map((movie) => (
          <Link to={`/player/${movie.id}`} key={movie.id}> {/* Link to Player page */}
            <div className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                className="movie-poster"
              />
              <h3 className="movie-title">{movie.original_title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
