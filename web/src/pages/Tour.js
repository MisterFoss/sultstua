import { useState } from "react"
import {Cell, PrelimCell} from "../components/cells/Cell"
import {getTourData} from "../service/api"
import { useApi } from "../components/hooks/useApi";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "./Tour.css" 


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
          {tourData.animes.map(anime => <Cell tourId={id} anime={anime} key={anime.id}/>)}
          {/* {tourData.animes.map(anime => <PrelimCell tourId={id} anime={anime} scores={scoreObj} key={anime.id}/>)}  */}
        </div>
        {/* <div className="animeDetails">hi</div> */}
      </div>
    </Layout>
  );
}