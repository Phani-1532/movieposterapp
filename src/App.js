import './App.css';
import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState('');
  const [data, setData] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${movies}&apikey=263d22d8`)
      .then(response => response.json())
      .then(data => setData(data.Search || []));
  };

  const download = (url) => {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "poster.png");
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => console.log(err));
  };

  return (
    <center>
      <h1>🎬 Movie Poster Hub 🎥</h1>

      {/* Search Bar */}
      <form className="search-container" onSubmit={submitHandler}>
        <input
          type="text"
          className="search-input"
          placeholder="🔎 Find your favorite movie posters..."
          value={movies}
          onChange={(e) => setMovies(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {/* Clean Placeholder Section */}
      {data.length === 0 ? (
        <div className="placeholder">
          <p>✨ Discover <span>epic movie posters</span> in high resolution!</p>
          <p>🎬 Type a movie name and start exploring.</p>
        </div>
      ) : (
        <div className="row">
          {data.map((movie) => (
            <div className="col-md-4" key={movie.imdbID}>
              <div className="card">
                <img src={movie.Poster} alt={movie.Title} />
                <div className="card-body">
                  <h3 className="card-title">{movie.Title}</h3>
                  <a className="btn-primary" onClick={() => download(movie.Poster)}>⬇ Download Poster</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </center>
  );
}

export default App;
