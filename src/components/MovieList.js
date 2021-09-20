
const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content m-3'>
                    <img src={movie.Poster} alt='movie'/>
                    <div
                        onClick={() => props.handleFavouritesClick(movie)}
                        className='overlay d-flex align-items justify-content-center'
                    >
                        <FavouriteComponent/>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MovieList

