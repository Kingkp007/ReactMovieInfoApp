import React, {useState, useEffect} from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { API_URL } from './context';



const SingleMovie = () => {
  const { id } = useParams();
  console.log(id);


  const [isLoading, setIsLoading] = useState(true); 
    const [movie, setMovie] = useState("");

    // const [query, setQuery] = useState("hacker");
    // const { isLoading, isError, movie } = useFetch(`&s=${query}`);

    const getMovies  = async(url)=>{
        try{
            const res = await fetch(url);
            const data = await res.json();
            if(data.Response ==="True"){
                setIsLoading(false);
                setMovie(data);
            }
            console.log(data);
        } 
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&i=${id}`);
        }, 500);

        return() => clearTimeout(timerOut);
    
    },[id]);


    if(isLoading) {
      return (
      <div className = "movie-section">
        <div className = "loading">Loading...</div>
      </div>
      );
    }



  return (
    <>
      <section className = "movie-section">
        <div className = "movie-card">
          <figure>
            <img src = {movie.Poster} alt = "#"></img>
          </figure>
          <div className="card-content">
            <p className="title">{movie.Title}</p>
            <p className="card-text">{movie.Released}</p>
            <p className="">{movie.Genre}</p>
            <p className="">{movie.imdbRating} /10</p>
            <p className="">{movie.Country}</p>
            <NavLink to = "/" className = "back-button">Go Back</NavLink>
          </div>
         </div>

      </section>
    </>
  )
   
};

export default SingleMovie;