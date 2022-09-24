import { voteToPrelim } from "../../app/api"



export default function PrelimVote(props) {
    
    async function onSubmit(event) {
        event.preventDefault()
        let formData = new FormData(event.target)
        let {score, judgeId} = Object.fromEntries(formData)
        // let animeList = createTourData()
        // let splash = drawTileImage(await makeImgList(animeList, true)).toDataURL("image/webp")
        await voteToPrelim(props.anime.id, props.tourId, judgeId, score)
    }



    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="number" placeholder="score" name="score"/>
                <input type="number" placeholder="ID" defaultValue={1} name="judgeId"/>
                <input type="submit"/>
            </form>
        </>
        )
}