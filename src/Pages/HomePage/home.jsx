import React, { useState, useEffect } from 'react'
import "./home.scss";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Carousel from 'react-multi-carousel';
import {IMG_URL, SERVER_API_URL} from "../../utils/constants";
import Row from '../../Components/Row/row';
import 'react-multi-carousel/lib/styles.css';

const imgUrl = IMG_URL;
const express_API_URL=SERVER_API_URL;

function Home() {


  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows]=useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);

  async function fetchMovies(){
try {
  // Popuplar & Top Rated Movies
  const responsePopularMovies = await axios.get(`${express_API_URL}/movies?type=Popular`);
  const responseTopRatedMovies = await axios.get(`${express_API_URL}/movies?type=Top Rated`);
  // Now Playing Movies
  const responseNowPlayingMovies= await axios.get(`${express_API_URL}/movies?type=Now Playing`);
  // Popular & Top Rated Movies
  const responseTopRatedTvShows = await axios.get(`${express_API_URL}/tvshows?type=Top Rated`);
  const responsePopularTvShows= await axios.get(`${express_API_URL}/tvshows?type=Popular`);

// Setting the Now Playing Movies Value

  setNowPlayingMovies(responseNowPlayingMovies.data);
// Setting Popular & Top Rated Movies value
  setPopularMovies(responsePopularMovies.data);
  setTopRatedMovies(responseTopRatedMovies.data);
// Setting Popular & Top Rated Tv Shows value
  setTopRatedTvShows(responseTopRatedTvShows.data);
  setPopularTvShows(responsePopularTvShows.data)
  
} catch (error) {
  console.error(`Failied to Fetch TvShows & Movies Home Page: ${error.message}`);
}
  } 

  useEffect(() => {
    fetchMovies();
  }, [])


  return (
    <section className="home">
      <div className="banner">
        {popularMovies.length > 0 && (
          <>
            <Carousel
              responsive={{
                superLargeDesktop: {
                  breakpoint: { max: 4000, min: 3000 },
                  items: 1,
                },
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 1,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 1,
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                },
              }}
              infinite
              autoPlay
              autoPlaySpeed={4000}
            >
              {popularMovies.slice(0, 5).map((movie, index) => (
                <div
                  key={index}
                  className="banner-item"
                  style={{
                    backgroundImage: `url(${imgUrl}/${movie.backdrop_path})`,
                  }}
                >
                  <h1>{movie.original_title}</h1>
                  <p>{movie.overview}</p>
                  <div>
                    <button>
                      <BiPlay /> Play
                    </button>
                    <button>
                      My List <AiOutlinePlus />
                    </button>
                  </div>
                  <div className="fade"></div>
                </div>
              ))}
            </Carousel>
          </>
        )}

      </div>

    
      <Row title={"Now Playing Movies"} arr={nowPlayingMovies} />

      <Row title={"Popular Movies"} arr={popularMovies} />
      <Row title={"Popular Tv Shows"} arr={popularTvShows} />

      <Row title={"Top Rated Movies"} arr={topRatedMovies} />
      <Row title={"Top Rated Tv Shows"} arr={topRatedTvShows} />
    </section>
  )
}

export default Home
