import React from 'react';

const MovieCard = ({movie, selectMovie}) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/"
    return (
        <div
            className={"movie-card"}
            id={"card"}
            onClick={() => {
                selectMovie(movie);
                window.scrollTo(0, 0);
            }} >
            {movie.poster_path ? <img className={"movie-cover"} src={`${IMAGE_PATH}${movie.poster_path}`} alt=""/>
                :
                <div className={"no-image"}>No Image Found</div>
            }
            <h5 className={"movie-title"}>{movie.title}</h5>
        </div>
    );
};

export default MovieCard;