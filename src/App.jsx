import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from "./components/movie-card";


function App() {

  const API_URL = "https://api.themoviedb.org/3"
  const BACKGROUND_IMAGE_PATH = "https://image.tmdb.org/t/p/w1280/"
  const API_KEY = "502709b57a68d03a1d751fc801b2b4ea"
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState({})
  const [searchKey, setSearchKey] = useState("")

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover"
    const {data:{results}} = await axios.get(`${API_URL}/${type}/movie`,{
      params: {
        api_key: API_KEY,
        query: searchKey
      }
    })
    setMovies(results)
  }

  useEffect(() =>{
    fetchMovies(searchKey)
  })


  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
      key={movie.id}
      movie={movie}
      selectMovie={setSelectedMovie}
      />
    ))
  )
 
  const searchMovies = (e) =>{
    e.preventDefault()
    fetchMovies()
  }

  return (
    <div className="App">
      <div className={"info"}  style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) ,url(${BACKGROUND_IMAGE_PATH}${selectedMovie.backdrop_path})`}}>
        <header>
          <p className={"title"}>iLovemovies</p>
          <form onSubmit={searchMovies}>
            <input type={"text"} onChange={(e) => setSearchKey(e.target.value)} />

          </form>
        </header>
        <div className={"info-content"}>
          <h1>{selectedMovie.title}</h1>
          {selectedMovie.overview ? <p>{selectedMovie.overview}</p> : null}
        </div>
      </div>
      <div className="container">
        {renderMovies()}
      </div>
    </div>
    
  )
}

export default App
