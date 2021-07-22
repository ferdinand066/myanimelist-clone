import '../assets/scss/components/AnimeCard/anime-card.css'

export default function AnimeCard({anime}){

    let favorite = localStorage.getItem('mal-favorite')

    if (favorite !== null){
        favorite = JSON.parse(favorite);
    }

    let star;

    if (favorite && anime.mal_id in favorite){
        star = <i className="fa fa-star fa-lg text-warning" aria-hidden="true"></i>  
    } else {
        star = <i className="far fa-star fa-lg text-warning" aria-hidden="true"></i>  
    }

    return (<div className="card m-2">
                <img className="card-img-top p-2" src={anime.image_url} alt="" />
                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 className="card-title font-weight-bold">{anime.title}</h5>
                        <p className="card-subtitle">{anime.synopsis}</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        {star}
                        <a href={"/anime/" + anime.mal_id} className="btn">View Detail</a>
                    </div>
                </div>
            </div>
        )
}