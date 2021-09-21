import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';
import AddFavourite from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import './App.css';


function App() {
  const [searchValue, setSearchValue] = useState('')
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([])

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    const response = await fetch(url)
    const responseJson = await response.json();
    if (responseJson.Search){
      setMovies(responseJson.Search)
    }
  }

  useEffect(() => {
   getMovieRequest(searchValue)
  }, [searchValue])

  // useEffect(() => {
  //   const movieFavourites = JSON.parse(
  //     localStorage.getItem('react-movie-app-favourites')
  //   )
  //   setFavourites(movieFavourites)
  // })

  // const saveToLocalStorage = (items) => {
  //   localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  // }

  const AddFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)
    //saveToLocalStorage(newFavouriteList)
  }

  const RemoveFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    )
    setFavourites(newFavouriteList)
    //saveToLocalStorage(newFavouriteList)
  }

  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox 
          searchValue={searchValue} 
          setSearchValue={setSearchValue}
        />

      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          favouriteComponent={AddFavourite}
          handleFavouritesClick={AddFavouriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={RemoveFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
