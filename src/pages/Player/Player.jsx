import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useParams } from "react-router-dom";
import RateMovie from "./RateMovie";

const Player = () => {
  const { id } = useParams();

  const [apiData, setApiData] = useState({
    original_title: "",
    key: "",
    release_date: "",
    vote_average: "",
    genres: [],
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQ0YjM3M2U2MmY2Yjc1N2I5NDdjZDhjZWQxN2Q0OCIsIm5iZiI6MTcyOTgzODYwMy41NTgyMzgsInN1YiI6IjY2ZGZjMmE2YTljYTIwMzE0OWYxYmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OvL2QqZXMctok_UEvSNbrcUMG_WfjCI_EqVjlVr3nnM",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setApiData(response))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <div className="player-head">
        <Link to={"/"}>
          <img src={back_arrow_icon} alt="Back" />
        </Link>
        <div className="oke">
        <img src={`https://image.tmdb.org/t/p/w500${apiData.poster_path}`}
          alt={apiData.original_title} /> 
        </div>
         
          
        
      </div>

      <div className="player-info">
        <h2>{apiData.original_title}</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <p>Movie Name </p>
              </td>
              <td className="ps">: </td>
              <td>
                <p className="ps">{apiData.original_title}</p>
              </td>
            </tr>

            <tr>
              <td>
                <p>Type </p>
              </td>
              <td className="ps">: </td>
              <td>
                <p className="ps">
                  {apiData.genres.map((genre) => genre.name).join(", ")}
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p>Tagline </p>
              </td>
              <td className="ps">: </td>
              <td>
                <p className="ps">{apiData.tagline}</p>
              </td>
            </tr>

            <tr>
              <td>
                <p>Published </p>
              </td>
              <td className="ps">: </td>
              <td>
                <p className="ps">
                  {apiData.release_date
                    ? apiData.release_date.slice(0, 10)
                    : ""}
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p>Rating </p>
              </td>
              <td className="ps">: </td>
              <td>
                <p className="ps">{apiData.vote_average}</p>
              </td>
            </tr>

            <tr>
              <td>
                <p>Voter </p>
              </td>
              <td className="ps">: </td>
              <td>
                <p className="ps">{apiData.vote_count}</p>
              </td>
            </tr>

            <RateMovie movieId={id} />

            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Player;
