import { animeTitle } from "../../app/animeFunc/animeTitle";
import { TrailerLink } from "../../app/animeFunc/TrailerLink";
import "./Cell.css"
import PrelimVote from "./PrelimVote";


function prelimPointSum(anime, scores){
    let id = anime.id
    let sum = 0
    if(scores[id] == null) {
        return sum 
    }
    
    scores[id].map(score => sum += score.scoreA)
    return sum
}

export function Cell(props) {
    let anime = props.anime
    return (
        <div className="cell" style={{"--poster-color": anime.coverImage.color}}>
            <div className="splash">
                <img className="poster" src={anime.coverImage?.large} alt="Anime Poster"/>
            </div>
            <div className="info">
                <h3 className="title"> 
                    {animeTitle(anime)}
                </h3>
                <div className="trailer">
                    <TrailerLink anime={anime}/>
                </div>
                <div className="synopsis">
                    {anime.description}
                </div>
                <div className="tags">
                    {anime.genres.map(tag => <div className="tag" data-tag={tag} key={tag}>{tag}</div>) }
                </div>
                <div className="points">
                    <PrelimVote anime={anime} tourId={props.tourId}/>
                </div>
            </div>
        </div>
    )
}




export function PrelimCell({anime, tourId, scores, setSelectedAnime}) {
    
    function onClick(id) {
        setSelectedAnime(id)
        console.log(id)
    }
    
    return (
        <div onClick={()=>onClick(anime.id)} className="prelimCell" style={{"--poster-color": anime.coverImage.color}}>
            <div className="splash">
                <img className="poster" src={anime.coverImage?.large} alt="Anime Poster"/>
                <div className="animeName">
                    {animeTitle(anime)}
                </div>
                <div className="pointSum">
                    {prelimPointSum(anime, scores)}
                </div>
            </div>
        </div>
    )
}

// <>
// <div className="tourCell">
//     <div className="tourSplash">
//         <img className="tourPoster" alt="" src={tour.splash}></img>
//         <Link className="tourName" to={"/tournament/"+tour.id}>{tour.name}</Link>
//     </div>
// </div>
// </>