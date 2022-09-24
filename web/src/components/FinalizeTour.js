import { tourDataToDatabase } from "../service/api"
import { drawTileImage, makeImgList } from "../service/makeImg"




export default function FinalizeTour({transformSelected, createTourData}) {
    
    async function onSubmit(event) {
        event.preventDefault()
        let formData = new FormData(event.target)
        let {tourName} = Object.fromEntries(formData)
        let animeList = createTourData()
        let splash = drawTileImage(await makeImgList(animeList, true)).toDataURL("image/webp")
        await tourDataToDatabase(tourName, splash, animeList)
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" name="tourName" placeholder="What shall you call it?"/>
                <button type="submit">Creat Tournament</button>
            </form>            
            <button onClick={()=>transformSelected("removeSequals")}>Remove Sequals</button>
            <button onClick={()=>transformSelected("addAll")}>Add All</button>
            <button onClick={()=>transformSelected("removeAll")}>Remove All</button>
        </>
    )
}