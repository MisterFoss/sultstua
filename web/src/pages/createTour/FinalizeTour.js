import { tourDataToDatabase } from "../../app/api"
import { drawTourImage } from "./drawTourImage"


export default function FinalizeTour({transformSelected, listOfSelected}) {
    
    async function onSubmit(event) {
        event.preventDefault()
        let formData = new FormData(event.target)
        let {tourName} = Object.fromEntries(formData)
        let splash = await drawTourImage(listOfSelected)
        await tourDataToDatabase(tourName, splash, listOfSelected)
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