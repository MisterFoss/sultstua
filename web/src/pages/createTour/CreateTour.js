import { useState } from "react"
import Layout from "../../app/layout/Layout"
import { useApi } from "../../utils/useApi"
import { drawTourImage } from "./drawTourImage"
import FinalizeTour from "./FinalizeTour"
import SeasonSelect from "./SeasonSelect"
import { SelectableCell } from "./SelectableCell"



export default function CreateTour() {
    
    let [anilistData, setAnilistData] = useState(null) 
    let [selectedAnime, setSelectedAnime] = useState({})
    let tourImage = useApi(drawTourImage, getListOfSelected())

    function getListOfSelected(){
        return anilistData?.filter(anime=>selectedAnime[anime.id]) ?? []
    }


    function transformSelected(method) {

        let newSelected = {...selectedAnime}

        if(method === "removeSequals") {
            anilistData.map(anime => {
                if(anime.relations.edges.some(edge => edge.relationType === "PREQUEL")) {
                    newSelected[anime.id] = false
                }
            })
        }
        if(method === "addAll") {
            anilistData.map(anime=>newSelected[anime.id]=true)
        }
        if(method === "removeAll") {
            anilistData.map(anime=>newSelected[anime.id]=false)
        }
        setSelectedAnime(newSelected)
    }


    function onSelect(selected, id) {
        setSelectedAnime({...selectedAnime, [id]: selected})
    }

    console.log("hello form create tour", anilistData)
    return(
        <Layout>
            <SeasonSelect setSelectedAnime={setSelectedAnime} setAnilistData={setAnilistData}/>
            {anilistData && <FinalizeTour transformSelected={transformSelected} listOfSelected={getListOfSelected()}/>}
            {anilistData && <img src={tourImage} alt=""/>}
            <div className="list">
                {anilistData?.map(anime => 
                    <SelectableCell 
                        onSelect={onSelect} 
                        selected={selectedAnime[anime.id]} 
                        anime={anime} 
                        key={anime.id}
                    />
                )}
            </div>
        </Layout>
    )
}