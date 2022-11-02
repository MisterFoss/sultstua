import { animeTitle } from "../../app/animeFunc/animeTitle";
import "./PrelimCell.css"


function prelimPointSum(anime, scores){
    let id = anime.id
    let sum = 0
    if(scores[id] == null) {
        return sum 
    }
    
    scores[id].map(score => sum += score.scoreA)
    return sum
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
