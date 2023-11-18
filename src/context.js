// context its like a warehouse . Whoever need data can use GET 
// 1. Context (like a ware house)
// 2.Provider(Likke a delivery boy)
// 3.Consumer(ut lengthy process)/(useContext)


import React, { useContext, useEffect, useState } from "react";
// import useFetch from "./useFetch";

// https://www.omdbapi.com/?i=tt3896198&apikey=cf47fec1&s=titanic
// ${process.env.REACT_APP_API_KEY}

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
const AppContext = React.createContext();

// we need to create a provider function
const AppProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: false, msg: "  " });
    const [query, setQuery] = useState("Titanic");

    // const [query, setQuery] = useState("hacker");
    // const { isLoading, isError, movie } = useFetch(`&s=${query}`);

    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "True") {
                setIsLoading(false);
                setIsError({
                    show: false, msg: ""
                });
                setMovie(data.Search);
            }
            else {
                setIsError({
                    show: true, msg: data.Error
                });
            }
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 500);

        return () => clearTimeout(timerOut);

    }, [query]);


    return (<AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }} >
        {children}
    </AppContext.Provider>);
};

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };
