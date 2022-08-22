import {Cell} from "../components/Cell"
import {getTourData} from "../service/api"
import { useApi } from "../components/hooks/useApi";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";


export function Tour() {
    console.log("hello form tour")
    const {id} = useParams()
    const tourData = useApi(getTourData, id)
    
    if(tourData == null) {
      return (
        <Layout/>
      )
    }
    
    return (
      <Layout>
        <h1 className='tourName'>
          {tourData.tournamentName}
        </h1>
        <div className="list">
          {tourData.animes.map(anime => <Cell anime={anime} key={anime.id}/>)} 
        </div>
      </Layout>
    );
  }