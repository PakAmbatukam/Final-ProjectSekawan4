// SearchMovies.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Search.css'; // Pastikan untuk membuat file ini

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [showResults, setShowResults] = useState(false); // State untuk kontrol tampilan hasil
  const resultsRef = useRef(null); // Referensi untuk hasil pencarian
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQ0YjM3M2U2MmY2Yjc1N2I5NDdjZDhjZWQxN2Q0OCIsIm5iZiI6MTcyOTgzODYwMy41NTgyMzgsInN1YiI6IjY2ZGZjMmE2YTljYTIwMzE0OWYxYmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvL2QqZXMctok_UEvSNbrcUMG_WfjCI_EqVjlVr3nnM' // Ganti dengan API key Anda
    }
  };

  const handleSearch = async () => {
    if (!query) return; // Tidak melakukan pencarian jika query kosong
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`, options);
      setMovies(response.data.results);
      setShowResults(true); // Menampilkan hasil pencarian
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleClickOutside = (event) => {
    if (resultsRef.current && !resultsRef.current.contains(event.target)) {
      setShowResults(false); // Menyembunyikan hasil pencarian
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/player/${movieId}`); // Navigasi ke halaman detail film
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-movies">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {showResults && (
        <div className="movie-list" ref={resultsRef}>
          {movies.length > 0 ? (
            movies.map(movie => (
              <div className="movie-card" key={movie.id} onClick={() => handleMovieClick(movie.id)}> {/* Navigasi saat klik */}
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-overview">{movie.overview}</p>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
