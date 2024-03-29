import { useState } from "react"
import { useParams } from "react-router-dom";
import { TrailerEmbed } from "../../app/animeFunc/TrailerEmbed";
import { getTourData } from "../../app/api";
import Layout from "../../app/layout/Layout";
import { useApi } from "../../utils/useApi";
import { PrelimCell } from "./PrelimCell";
import PrelimVote from "./PrelimVote";
import "./Tour.css" 


function AnimeDetails({animes, selectedAnime, tourId, scores}) {
  
  const anime = animes?.find(anime=> selectedAnime === anime.id)
  console.log("yellow",anime, scores[anime.id])
  return <>
    <div className="animeDetails">
      <div className="splash">
        <img src={anime.coverImage.large} alt=""></img>
        <div className="yourScore">
        </div>
      </div>
      <div className="trailer">
        <TrailerEmbed anime={anime}/>
      </div>
      <div className="sideInfo">
        <PrelimVote anime={anime} tourId={tourId}/>
        {scores[anime.id].map(vote => <VoteElem vote={vote}/>)}
      </div>
      <div className="descriptionBox">
        <div className="title">
          {anime.title.english}
        </div>
        <div className="description">
          {anime.description}
        </div>
      </div>
    </div>  
  </>
}




function VoteElem(vote) {
  return <>
    <div className="voteElem">
      <div className="judge">
        {vote.vote.Judge}
      </div>
      <div className="points">
        {vote.vote.scoreA}
      </div>
    </div>
  </>
}












function makeScoreObject(scoreArr) {
  
  let scoreObj = {}
  
  scoreArr.forEach(score => {
    if(score.name != null) {
      let key = score.anilist_id
      if(scoreObj[key] == null) {
        scoreObj[key] = [{Judge:score.name, scoreA:score.score_A, scoreB:score.score_B}]
      }else {
        scoreObj[key].push({Judge:score.name, scoreA:score.score_A, scoreB:score.score_B})
      }
    }
  });
  return (scoreObj)    
}

export function Tour() {
  let [selectedAnime, setSelectedAnime] = useState(null)


  console.log("hello form tour")
  const {id} = useParams()
  const tourData = useApi(getTourData, id)
  
  
  if(tourData == null) {
    return (
      <Layout/>
      )
  }
  
  const scoreObj = makeScoreObject(tourData.score)
  console.log(scoreObj)

  return (
    <Layout>
      <h1 className='tourName'>
        {tourData.tournamentName}
      </h1>
      <div className="tour">
        <div className="list">
          {/* {tourData.animes.map(anime => <Cell tourId={id} anime={anime} key={anime.id}/>)} */}
          {tourData.animes.map(anime => <PrelimCell 
            tourId={id} 
            anime={anime} 
            scores={scoreObj} 
            key={anime.id}
            setSelectedAnime={setSelectedAnime}
          />)} 
        </div>
        {selectedAnime && 
          <AnimeDetails 
            animes={tourData.animes} 
            selectedAnime={selectedAnime} 
            tourId={id} 
            scores={scoreObj}
          />
        }
      </div>
    </Layout>
  );
}