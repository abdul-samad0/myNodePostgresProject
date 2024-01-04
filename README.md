# Netflix Clone using MERN Stack with PostgreSQL Integration

## Overview

This Netflix clone is developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It now features integration with PostgreSQL, replacing MongoDB for data storage. The backend, frontend, and data extraction process have been updated to accommodate the switch to PostgreSQL.

## Data Extraction

The data extraction process is handled by the `dataExtraction.js` file in the Extraction code folder. This script pulls data from the TMDB API and stores it in PostgreSQL.

## Frontend Features

- **Home Page**: Displays different popular, top-rated movies, and TV shows.
- **Movies Filter**: Shows only movies.
- **TV Shows Filter**: Shows only TV shows.

## Backend Features

### Endpoints:

- `/api/movies`: Retrieves all movie data.
- `/api/tvshows`: Retrieves all TV shows.
- `/api/addMovie/userId/movieId`: Adds a movie to the user's favorite list.
- `/api/removeMovie/userId/movieId`: Removes a movie from the user's favorite list.
- `/api/addTvshows/userId/tvshowsId`: Adds a TV show to the user's favorite list.
- `/api/removeTvshows/userId/tvshowsId`: Removes a TV show from the user's favorite list.

### User Authentication:

- **Signup and Login**: Implemented with password hashing and JWT.
- **Verified Users Only**: Only verified users are allowed to add and remove movies and TV shows.

## Project Structure

- **Extraction Code Folder**: Contains `dataExtraction.js` for TMDB API data extraction.
- **Frontend**: Implements the Netflix UI with React.
- **Backend**: Utilizes Express and Node.js for server-side logic with PostgreSQL integration.
- **Database**: PostgreSQL is used to store user and movie/TV show data.

## How to Run

1. Clone the repository.
2. Run the frontend and backend separately.
3. Ensure PostgreSQL is set up and connected.
4. Use the provided API endpoints to interact with the application.

## Additional Considerations

- **JWT Token**: Used for user authentication.
- **User Authorization**: Only verified users can add and remove movies and TV shows.
