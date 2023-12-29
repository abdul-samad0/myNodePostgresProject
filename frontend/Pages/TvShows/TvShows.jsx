import React, { useState, useEffect } from 'react'
import "../HomePage/home";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Carousel from 'react-multi-carousel';
import {IMG_URL, SERVER_API_URL} from "../../utils/constants";
import Row from '../../Components/Row/row'
import 'react-multi-carousel/lib/styles.css';

const imgUrl = IMG_URL;
const express_API_URL=SERVER_API_URL;

const TvShows = () => {
  const [airingTodayTvShows, setAiringTodayTvShows]=useState([]);
  const [onTheAirTvShows,setOnTheAirTvShows]=useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);

  async function fetchTvShows(){
    try {
      const responseAiringToday = await axios.get(`${express_API_URL}/tvshows?type=Airing Today`);
      const responseOnTheAir = await axios.get(`${express_API_URL}/tvshows?type=On The Air`);
      const responseTopRated = await axios.get(`${express_API_URL}/tvshows?type=Top Rated`);
      const responsePopular= await axios.get(`${express_API_URL}/tvshows?type=Popular`);
    
      setAiringTodayTvShows(responseAiringToday.data);
      setOnTheAirTvShows(responseOnTheAir.data);
      setPopularTvShows(responsePopular.data);
      setTopRatedTvShows(responseTopRated.data);
    } catch (error) {
      console.error(`Failied to Fetch TvShows ${error.message}`);
    }
      } 
    
      useEffect(() => {
        fetchTvShows();
      }, [])
    

  return (
    <section className="home">
      <div className="banner">
        {popularTvShows.length > 0 && (
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
              {popularTvShows.slice(0, 5).map((tvshow, index) => (
                <div
                  key={index}
                  className="banner-item"
                  style={{
                    backgroundImage: `url(${imgUrl}/${tvshow.backdrop_path})`,
                  }}
                >
                  <h1>{tvshow.original_name}</h1>
                  <p>{tvshow.overview}</p>
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

      <Row title={"Airing Today"} arr={airingTodayTvShows} />
      <Row title={"On The Air"} arr={onTheAirTvShows} />
      <Row title={"Popular"} arr={popularTvShows} />
      <Row title={"Top Rated"} arr={topRatedTvShows} />
    </section>
  )
}

export default TvShows
