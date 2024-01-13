import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieList from "./Components/MovieList/movieList";
import SearchAppBar from "./Components/Appbar/Appbar";
import MovieDetail from "./Components/MovieDetail/MovieDetail";

function App() {
  return ( 
      <BrowserRouter>
      <SearchAppBar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
