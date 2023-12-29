import React from 'react';
import './MoviePopup.scss'; 

const MoviePopup = ({ movie, imgUrl, onClose }) => {
  return (
    <div className="movie-popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        
        <img src={`${imgUrl}/${movie.backdrop_path}`} alt={movie.original_title} />
        <h2>{movie.original_title}</h2>
        <p>{movie.overview}</p>
        <div className="additional-info">
          <p><strong>Language:</strong> {movie.original_language}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating :</strong> {movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default MoviePopup;
