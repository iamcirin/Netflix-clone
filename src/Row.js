import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "./axios";
import "./row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const img_api = "https://image.tmdb.org/t/p/original";
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //whenever we use a variable from the outside in useEffect we always have to put it as a dependency
  // console.log(movies);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  //<iframe width="701" height="480" src="https://www.youtube.com/embed/oqxAJKy0ii4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  const handleClick = (movie) => {
    console.log(movie);
    if(movie.name === 'Squid Game'){
      setTrailerUrl("oqxAJKy0ii4");
      
    }
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || "")
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);

          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"} `}
            src={
              isLargeRow
                ? img_api + movie.poster_path
                : img_api + movie.backdrop_path
            }
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
