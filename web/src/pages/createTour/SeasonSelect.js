import { fetchAnimeBySeason } from "./anilistCall"

    
function defaultSelected(animeList) {
    return (
        Object.fromEntries(
            animeList.map(anime=>[anime.id, true])
        )
    )
}



export default function SeasonSelect({setAnilistData, setSelectedAnime}) {
    
    function onSubmit(event) {
        
        event.preventDefault()
        let formData = new FormData(event.target)
        let {season, seasonYear} = Object.fromEntries(formData)
        fetchAnimeBySeason(season, parseInt(seasonYear)).then(animeList=>{
            setAnilistData(animeList)
            setSelectedAnime(defaultSelected(animeList))
        }).catch(err=>{
            console.error(err)
            setAnilistData(null)
            setSelectedAnime({})
        })
    }
    
    return (
        <form id="query" onSubmit={onSubmit}>
            <select name="season">
                <option value="WINTER">Winter</option>
                <option value="SPRING">Spring</option>
                <option value="SUMMER">Summer</option>
                <option value="FALL">Autumn</option>
            </select>
            <input type="number" id="seasonYear" name="seasonYear" min="1" defaultValue={2022}/>
            <input type="submit" value="Generate"/>
        </form>
    )  
}