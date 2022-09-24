import { useState } from "react"
import Canvas from "../components/Canvas"
import { SelectableCell } from "../components/cells/Cell"
import FinalizeTour from "../components/FinalizeTour"
import Layout from "../components/Layout"
import SeasonSelect from "../components/SeasonSelect"
import { fetchListOfAnime } from "../service/anilist"
import { drawTileImage, makeImgList } from "../service/makeImg"



export default function CreateTour() {
    
    let [createData, setCreateData] = useState(null) 
    let [selectedAnime, setSelectedAnime] = useState({})

    

    function onSeasonSelect(season, seasonYear) {
        console.log("hello from seasonselect")
        fetchListOfAnime(season, seasonYear).then(animeList=>{
            setCreateData(animeList)
            setSelectedAnime(defaultSelected(animeList))
        }).catch(err=>{
            console.error(err)
            setCreateData(null)
            setSelectedAnime({})
        })
    }


    async function draw(canvas) {
        console.log(canvas)
        let list = await makeImgList(createTourData())
        drawTileImage(list, canvas)
    }


    function createTourData(){
        const list = createData.filter(anime=>selectedAnime[anime.id])
        return list
    }


    function transformSelected(method) {

        let newSelected = {...selectedAnime}

        if(method === "removeSequals") {
            createData.map(anime => {
                if(anime.relations.edges.some(edge => edge.relationType === "PREQUEL")) {
                    newSelected[anime.id] = false
                }
            })
        }
        if(method === "addAll") {
            createData.map(anime=>newSelected[anime.id]=true)
        }
        if(method === "removeAll") {
            createData.map(anime=>newSelected[anime.id]=false)
        }
        setSelectedAnime(newSelected)
    }



    function defaultSelected(animeList) {
        return (
            Object.fromEntries(
                animeList.map(anime=>[anime.id, true])
            )
        )
    }
    
    function onSelect(selected, id) {
        setSelectedAnime({...selectedAnime, [id]: selected})
    }

    console.log("hello form create tour", createData)
    return(
        <Layout>
            <SeasonSelect onSeasonSelect={onSeasonSelect}/>
            {createData && <FinalizeTour transformSelected={transformSelected} createTourData={createTourData}/>}
            {createData && <Canvas draw={draw}/>}
            <div className="list">
                {createData?.map(anime => 
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