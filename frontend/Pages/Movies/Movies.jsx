import React, { useState, useEffect } from 'react'
import "../HomePage/home.scss";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Carousel from 'react-multi-carousel';
import {IMG_URL, SERVER_API_URL} from "../../utils/constants";
import Row from '../../Components/Row/row';
import 'react-multi-carousel/lib/styles.css';

const imgUrl = IMG_URL;
const express_API_URL=SERVER_API_URL;

function Movies() {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  async function fetchMovies(){
try {
  const responseUpcoming = await axios.get(`${express_API_URL}/movies?type=Upcoming`);
  const responsePopular = await axios.get(`${express_API_URL}/movies?type=Popular`);
  const responseTopRated = await axios.get(`${express_API_URL}/movies?type=Top Rated`);
  const responseNowPlaying= await axios.get(`${express_API_URL}/movies?type=Now Playing`);

  setUpcomingMovies(responseUpcoming.data);
  setNowPlayingMovies(responseNowPlaying.data);
  setPopularMovies(responsePopular.data);
  setTopRatedMovies(responseTopRated.data);
} catch (error) {
  console.error(`Failied to Fetch movies ${error.message}`);
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

      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
    </section>
  )
}

export default Movies
