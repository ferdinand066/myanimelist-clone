import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import Header from "../components/Header";

export default function FavoritePage () {
    const [animes, setAnimes] = useState([])

    useEffect(() => {
        GetAnime();
    }, [])

    function GetAnime(){
        if (localStorage.getItem('mal-favorite') === null) return
        let storage = JSON.parse(localStorage.getItem('mal-favorite'))
        let arr = []
        console.log(storage)

        Object.keys(storage).map((key, value) => {
            storage[key].mal_id = key
            arr.push(storage[key])
        })

        setAnimes(arr)
    }

    let information = ''

    if (animes.length === 0){
        information = 
        <div className="d-flex flex-column justify-content-center align-items-center h-full">
            <div className="h1">No favorites yet</div>
            <div>Your Favorite anime will show up here</div>
        </div>
    } 


    return (
        <React.Fragment>
            <Header />
            <div className="d-flex flex-row flex-wrap justify-content-center p-2 p-md-4">
                {animes?.map(anime => {
                    return (
                        <AnimeCard anime={anime} key={anime.mal_id} />
                    )
                })}
            </div>
            {information }
        </React.Fragment>
    )
}