import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState('')
  const [data, setData] = useState([])

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${movies}&apikey=263d22d8`).then(response => response.json()).then(data => setData(data.Search))
  }

  const download = url => {
    fetch(url).then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <center>
      <h1>Movie Poster App</h1>
      <br></br>
      <form>
        <input type="text" id="movieInput" placeholder="Enter movie title" value={movies} onChange={(e) => { setMovies(e.target.value) }} />
        <input type='submit' onClick={submitHandler} />
      </form>
      <div className='row'>
      {data.map(movie => 
      <div className='col-md-4'>
      <div class="card" style={{ width: "18rem" }}>
        <img src={movie.Poster} class="card-img-top" alt={movie.Title} />
          <div class="card-body">
            <h3 className='card-title'>{movie.Title}</h3>
            <a href={movie.Poster} className='btn btn-primary' onClick={() =>download(movie.Poster)}> Download Poster</a>
          </div>
      </div>
      </div>
      )}
      </div>
      
    </center>
  );
}

export default App;
