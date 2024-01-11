import { useEffect, useState } from "react";
import searchIcon from "./search.svg";
import "./App.css";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=4daadfba";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("Superman");
  }, []);

  return (
    <div className="app">
      <h1>Movie App</h1>

      <div className="search">
        <input
          placeholder="Search"
          value={searchItem}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovie(searchItem);
            }
          }}
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        ></input>
        <img
          src={searchIcon}
          alt="Search"
          onClick={() => {
            searchMovie(searchItem);
          }}
        ></img>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
