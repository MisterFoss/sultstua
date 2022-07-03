import { getTourData } from "../service/api";
import "./Cell.css"

function trailerHref(anime){
        if(anime.trailer.site === "youtube"){
            return `https://www.youtube.com/watch?v=${anime.trailer.id}`
        } else {
            return "#";
        }
}

function aniTitle(anime){
    if(anime.title.english) {
        return anime.title.english;
    } else {
        return anime.title.romaji;
    }
}

export function Cell(props) {
    let anime = props.anime
    return (
        <div className="cell" style={{"--poster-color": anime.coverImage.color}}>
            <div className="splash">
                <img className="poster" src={anime.coverImage.large} alt=""/>
            </div>
            <div className="info">
                <h3 className="title"> 
                    {aniTitle(anime)}
                </h3>
                <div className="trailer">
                    <a href={trailerHref(anime)}>Trailer</a>
                </div>
                <div className="synopsis">
                    {anime.description}
                </div>
                <div className="tags">
                    {anime.genres.map(tag => <div className="tag" data-tag={tag}>{tag}</div>) }
                </div>
                <div className="points">
                </div>
            </div>
        </div>
    )
}


// function createCellFromTemplate(anime){
//     let template = document.getElementById("list-cell-template");
//     let fragment = template.content.cloneNode(true);

//     fragment.querySelector(".poster").setAttribute("src", anime.coverImage.large)
//     fragment.querySelector(".cell").setAttribute("style", `--poster-color:${anime.coverImage.color};`);


//     let title;
//     if(anime.title.english) {
//         title = anime.title.english;
//     } else {
//         title = anime.title.romaji;
//     }
//     fragment.querySelector(".title").innerText = title;


//     if(anime.trailer){
//         let trailerHref;
//         if(anime.trailer.site === "youtube"){
//             trailerHref = `https://www.youtube.com/watch?v=${anime.trailer.id}`
//         } else {
//             trailerHref = "#";
//         }
//         fragment.querySelector(".trailer a").href = trailerHref;
//     } else {
//         fragment.querySelector(".trailer a").remove();
//     }

//     fragment.querySelector(".synopsis").innerHTML = anime.description;

//     let tags = fragment.querySelector(".tags");
//     for(let genre of anime.genres){
//         let tagElement = document.createElement("div");
//         tagElement.classList.add("tag");
//         tagElement.dataset["tag"] = genre.toLowerCase();
//         tagElement.innerText = genre;
//         tags.appendChild(tagElement);
//     }

//     let points = fragment.querySelector(".points");
//     points.setAttribute("id", "point-"+anime.id)
//     points.innerText = "0";

//     async function askForScore(){
//         let score = prompt("Give a score between 0 and 100");
//         if(score == null){
//             return;
//         }
//         score = parseInt(score);
//         if(isNaN(score) || score < 0 || score > 100){
//             alert("Score must be a number between 0 and 100.");
//             return askForScore();
//         }

        
//         console.log("user", getUserName(), "gave score", score, "to anime", anime.id, title)

//         let newScore = await postJson("/api/score", {
//             tournamentId: tourId,
//             animeId: anime.id,
//             judgeName: getUserName(),
//             score 
//         });
//         setPoints(newScore);

//     }
//     points.addEventListener("click", askForScore)


//     return fragment;
// }


// function setPoints(scores){
//     for(let score of scores){
//         document.getElementById("point-"+score.anilist_id).innerText = score.score
//     }
// }


// export function makeQualifierList(blob){
//     let list = document.getElementById("list");
    
//     for(let tour of blob.animes){
//         list.append(createCellFromTemplate(tour));
//     }
//     setPoints(blob.score)
// }