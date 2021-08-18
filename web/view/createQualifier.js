
import { fetchListOfAnime } from "../utils/fetchData.js";

let animeList;

function createCellFromTemplate(anime){
    let template = document.getElementById("list-cell-template");
    let fragment = template.content.cloneNode(true);

    fragment.querySelector(".poster").setAttribute("src", anime.coverImage.large)
    fragment.querySelector(".cell").setAttribute("style", `--poster-color:${anime.coverImage.color};`);


    let title;
    if(anime.title.english) {
        title = anime.title.english;
    } else {
        title = anime.title.romaji;
    }
    fragment.querySelector(".title").innerText = title;


    if(anime.trailer){
        let trailerHref;
        if(anime.trailer.site === "youtube"){
            trailerHref = `https://www.youtube.com/watch?v=${anime.trailer.id}`
        } else {
            trailerHref = "#";
        }
        fragment.querySelector(".trailer a").href = trailerHref;
    } else {
        fragment.querySelector(".trailer a").remove();
    }

    fragment.querySelector(".synopsis").innerHTML = anime.description;

    let tags = fragment.querySelector(".tags");
    for(let genre of anime.genres){
        let tagElement = document.createElement("div");
        tagElement.classList.add("tag");
        tagElement.dataset["tag"] = genre.toLowerCase();
        tagElement.innerText = genre;
        tags.appendChild(tagElement);
    }
    fragment.querySelector(".points input").value = anime.id;
    
    if( ! anime.relations.edges.some(edge => edge.relationType === "PREQUEL")){
        fragment.querySelector(".points input").checked = "on";
    }

    return fragment;
}

export async function fetchAndDisplayAnimeList(queryForm) {
    let queryData = new FormData(queryForm);
    let season = queryData.get("season");
    let seasonYear = queryData.get("seasonYear");

    animeList = await fetchListOfAnime(season, seasonYear);

    let list = document.getElementById("list");
    list.innerHTML = "";
    for(let anime of animeList) {
        list.append(createCellFromTemplate(anime));
    }
}

export async function createTournamentFromAnimeList(createForm){
    let createData = new FormData(createForm);

    let name = createData.get("tournamentName");
    let qualified = createData.getAll("qualified");
    qualified = qualified.map(id => parseInt(id));

    let list = animeList.filter(anime => qualified.includes(anime.id))

    console.log(name, qualified, list);

    let response = await fetch("/api/createTournament", {
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            name,
            list
        }),
        "method": "POST",
    });
}