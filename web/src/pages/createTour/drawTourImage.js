import { drawTileImage } from "../../utils/drawTileImage"


export async function drawTourImage(listOfAnime) {
    let list = await makeImgList(listOfAnime)
    return drawTileImage(list).toDataURL("image/webp")
}


async function makeImgList(animeData, CO=true) {

    let list = animeData
        .sort((a, b)=> b.popularity - a.popularity)
        .map(anime=> anime.coverImage.large)
        .map(src=>{
            let img = new Image()
            if(CO) {img.crossOrigin="anonymous"}
            img.src = src
            return new Promise((resolve, reject)=> {
                img.onload = ()=>resolve(img)
                img.onerror = (error)=>reject(error.toString())
            })
        })
    return await Promise.all(list)
}