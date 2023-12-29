import React , {useState} from 'react';
import Card from '../Card/Card';
import Carousel from 'react-multi-carousel';
import MoviePopup from '../MoviePopup/MoviePop';
import "./row.scss"
import { IMG_URL } from "../../utils/constants"
import 'react-multi-carousel/lib/styles.css';

const imgUrl = IMG_URL;

const Row = ({ title, arr = [] }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
  
    const handleClickCard = (movie) => {
      setSelectedMovie(movie);
    }
  
    const closePopUp = () => {
      setSelectedMovie(null);
    }
  
    const responsive = {
      superLargeDesktop: {
  
        breakpoint: { max: 4000, min: 3000 },
        items: 13
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 8
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 5
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
      }
    };
  
    return (
  
      <div className='row'>
        <h2>{title}</h2>
  
        <Carousel swipeable={false} draggable={false} responsive={responsive} className="img-row">
          {arr.map((item, index) => (
            <Card className="row-card"
              key={index}
              img={`${imgUrl}/${item.poster_path}`}
              onClick={() => handleClickCard(item)}
            />
          ))}
        </Carousel>
  
        {
          selectedMovie && <MoviePopup movie={selectedMovie} imgUrl={imgUrl} onClose={closePopUp} />
        }
  
      </div>
    );
  }

export default Row;
