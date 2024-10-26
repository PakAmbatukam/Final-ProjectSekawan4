// RateMovie.jsx
import React, { useState } from "react";
import axios from "axios";
import "./RateMovie.css"; // Pastikan untuk mengimpor CSS
import { FaStar } from "react-icons/fa";

const RateMovie = ({ movieId }) => {
  const [rating, setRating] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [explanationMessage, setExplanationMessage] = useState("");
  const [isRated, setIsRated] = useState(false); // State untuk melacak apakah film sudah di-rating

  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQ0YjM3M2U2MmY2Yjc1N2I5NDdjZDhjZWQxN2Q0OCIsIm5iZiI6MTcyOTgzODYwMy41NTgyMzgsInN1YiI6IjY2ZGZjMmE2YTljYTIwMzE0OWYxYmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvL2QqZXMctok_UEvSNbrcUMG_WfjCI_EqVjlVr3nnM", // Ganti dengan kunci API yang valid
    },
  };

  const submitRating = async () => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/movie/${movieId}/rating`,
        { value: rating * 2 }, // Mengonversi rating ke skala 0-10
        options
      );
      setResponseMessage("Rating submitted successfully!");
      setExplanationMessage(`You rated this movie ${rating} out of 5 stars!`);
      setIsRated(true); // Set isRated menjadi true setelah berhasil rating
    } catch (error) {
      console.error("Error submitting rating:", error.response?.data || error.message);
      setResponseMessage("Failed to submit rating.");
      setExplanationMessage("");
    }
  };

  const deleteRating = async () => {
    try {
      const response = await axios.delete(
        `https://api.themoviedb.org/3/movie/${movieId}/rating`,
        options
      );
      setResponseMessage("Rating deleted successfully!");
      setExplanationMessage("You have removed your rating for this movie.");
      setRating(0); // Reset rating setelah menghapus
      setIsRated(false); // Set isRated menjadi false setelah rating dihapus
    } catch (error) {
      console.error("Error deleting rating:", error.response?.data || error.message);
      setResponseMessage("Failed to delete rating.");
      setExplanationMessage("");
    }
  };

  const handleRating = (value) => {
    setRating(value);
    setExplanationMessage(""); // Reset penjelasan saat rating dipilih
  };

  return (
    <div className="rateMovie">
      <h3 className="title">Rate this Movie</h3>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`star ${rating >= star ? "filled" : ""}`} // Warna bintang sesuai rating
            onClick={() => handleRating(star)} // Set rating saat bintang diklik
          />
        ))}
      </div>
      {!isRated && ( // Tampilkan tombol Submit jika film belum di-rating
        <button onClick={submitRating} className="button">
          Submit
        </button>
      )}
      {isRated && ( // Tampilkan tombol Delete Rating jika film sudah di-rating
        <div>
          <button onClick={deleteRating} className="button delete-button">
            Delete Rating
          </button>
        </div>
      )}
      {responseMessage && <p className="message">{responseMessage}</p>}
      {explanationMessage && <p className="explanation">{explanationMessage}</p>}
    </div>
  );
};

export default RateMovie;
