import React, { useEffect, useState } from "react";
import AnimeCard from "../components/AnimeCard";
import HeaderSearch from "../components/HeaderSearch";

export default function HomePage(){
    const [animes, setAnimes] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        GetAnime();
    }, [])

    function GetAnime(){
        fetch(`https://api.jikan.moe/v3/search/anime?q=${encodeURI(search)}&page=1&type=tv&genre=12&genre_exclude=0`)
        .then(res => res.json())
        .then(data => {
            setAnimes(data.results)
        })
    }

    const handleSearch = e => {
        e.preventDefault();
        GetAnime();
    }

    return (
        <React.Fragment>
            <HeaderSearch search={search} setSearch={setSearch} handleSearch={handleSearch}/>
            <div className="d-flex flex-row flex-wrap justify-content-center p-2 p-md-4">
                {animes?.map(anime => {
                    return (
                        <AnimeCard anime={anime} key={anime.mal_id} />
                    )
                })}
            </div>
        </React.Fragment>
    )
}