import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../assets/scss/pages/DetailPage/detail-page.css";

export default function DetailPage() {
  const [anime, setAnime] = useState("");
  const [studio, setStudio] = useState("");
  const [aired, setAired] = useState("");
  const [genre, setGenre] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.jikan.moe/v3/anime/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data);
        let studios = "";

        studios = data.studios.map((s) => {
          return studios + " " + s.name;
        });
        setStudio(studios);
        setAired(data.aired.string)
        setGenre(data.genres)
        checkFavorite()
      });
  }, []);

  function checkFavorite(){
    let storage = localStorage.getItem('mal-favorite');
    if (storage !== null){
      storage = JSON.parse(storage);
      if (id in storage){
        setFavorite(current => !current)
      }
    }
  }

  const titleAlias = () => {
    return anime.title !== anime.title_english ? (
      <div className="p-2 text-gray-500">
        <b>{anime.title_english}</b>
      </div>
    ) : (
      ""
    );
  };

  const insertFavorite = () => {
    let favoriteList = {};
    let obj = {
      image_url : anime.image_url,
      title : anime.title,
      synopsis : anime.synopsis
    }

    if (localStorage.getItem('mal-favorite') !== null){
      favoriteList = JSON.parse(localStorage.getItem('mal-favorite'))
    }

    favoriteList[anime.mal_id] = obj

    localStorage.setItem('mal-favorite', JSON.stringify(favoriteList))
    setFavorite(current => !current)
  }

  const deleteFavorite = () => {
    if (localStorage.getItem('mal-favorite') === null) return
    let favoriteList = JSON.parse(localStorage.getItem('mal-favorite'))
    
    delete favoriteList[id]

    if (Object.keys(favoriteList).length === 0){
      localStorage.removeItem('mal-favorite')
    } else localStorage.setItem('mal-favorite', JSON.stringify(favoriteList))

    setFavorite(current => !current)
  }

  let button;

  if (favorite === false){
    button = <button type="button" className="btn" onClick={insertFavorite}>Add Favorite</button>
  } else {
    button = <button type="button" className="btn" onClick={deleteFavorite}>Delete Favorite</button>
  }

  return (
    <React.Fragment>
      <Header />
      <div className="d-flex flex-column">
        <div className="anime-title font-weight-bold border-y">
          <div className="p-2">
            <b>{anime.title}</b>
          </div>
          {titleAlias()}
        </div>
        <div className="d-md-flex flex-md-row">
          <div className="d-flex flex-row flex-md-column p-2 border-bottom border-none">
            <img src={anime.image_url} alt="" className="detail-image" />
            <div className="d-flex flex-column ml-2 detail-description">
              <div className="m-1">
                <div className="text-lg">
                  <b><i className="fa fa-star text-warning"></i> {anime.score}</b>
                  <span>
                    ({anime.scored_by?.toLocaleString("en-US")} users)
                  </span>
                </div>
                <div>Ranked #{anime.rank}</div>
              </div>
              <div className="m-1">
                <div className="desc mt-2">
                  <b>Information</b>
                </div>
                <div className="divide-y"></div>
                <div className="synopsis my-1">
                  <span>
                    <b>Type: </b>
                  </span>
                  <span>{anime.type}</span>
                </div>
                <div className="synopsis my-1">
                  <span>
                    <b>Episodes: </b>
                  </span>
                  <span>{anime.episodes}</span>
                </div>
                <div className="synopsis my-1">
                  <span>
                    <b>Status: </b>
                  </span>
                  <span>{anime.status}</span>
                </div>
                <div className="synopsis my-1">
                  <span>
                    <b>Aired: </b>
                  </span>
                  <span>{aired}</span>
                </div>
                <div className="synopsis my-1">
                  <span>
                    <b>Premiered: </b>
                  </span>
                  <span>{anime.premiered}</span>
                </div>
                <div className="synopsis my-1">
                  <span>
                    <b>Studios: </b>
                  </span>
                  <span>{studio}</span>
                </div>
                <div className="synopsis my-1">
                  <span>
                    <b>Source: </b>
                  </span>
                  <span>{anime.source}</span>
                </div>
                <div className="synopsis my-1">
                  <span>
                    <b>Genre: </b>
                  </span>
                  { genre?.map(function(g, i) {
                      return <span key={g.url}>{ g.name }{i !== genre.length - 1 ? ', ' : ''}</span>
                  }) }
                </div>
                <div className="synopsis my-1">
                  <span>
                    <b>Duration: </b>
                  </span>
                  <span>{anime.duration}</span>
                </div>
                <div className="synopsis my-1">
                  <span>
                    <b>Rating: </b>
                  </span>
                  <span>{anime.rating}</span>
                </div>
              </div>
            </div>
            <div className="d-none d-md-flex"></div>
          </div>
          <div className="d-md-flex flex-md-row-reverse">
            <div className="p-2 flex-1">
              <div className="text-title">
                <b>Trailer</b>
              </div>
              <div className="w-video">
                <iframe
                  title={anime.title}
                  src={anime.trailer_url}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="p-2 synopsis-container flex-1">
              { button }
              <div className="text-title">
                <b>Synopsis</b>
              </div>
              <div className="synopsis">{anime.synopsis}</div>
              <div className="text-title">
                <b>Background</b>
              </div>
              <div className="synopsis">
                {anime.background
                  ? anime.background
                  : "No background information has been added to this title."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
