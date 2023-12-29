
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage/home';
import Header from "./Components/header/header"
import TvShows from './Pages/TvShows/TvShows';
import Movies from './Pages/Movies/Movies'

function App() {
  return (<Router>
    <Header/>
    <Routes>
      <Route path="/home" element={<Home/>}  />
      <Route path="/movies" element={<Movies/>}  />
      <Route path="/tvshows" element={<TvShows/>}  />
    </Routes>
  </Router>
  );
}

export default App;
