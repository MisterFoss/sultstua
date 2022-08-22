

export async function makeImgList(animeData) {

    let list = animeData
        .sort((a, b)=> b.popularity - a.popularity)
        .map(anime=> anime.coverImage.large)
        .map(src=>{
            let img = new Image()
            img.crossOrigin="anonymous"
            img.src = src
            return new Promise((resolve, reject)=> {
                img.onload = ()=>resolve(img)
                img.onerror = (error)=>reject(error.toString())
            })
        })
    return await Promise.all(list)
}





export function drawTileImage(images, canvas, tileWidth=100, tileHeight=150) {

    canvas = canvas ?? document.createElement("canvas")
    let tilePattern = Math.min(4,Math.floor(Math.sqrt(images.length)))
    canvas.height = tileHeight*tilePattern
    canvas.width = tileWidth*tilePattern
    const ctx = canvas.getContext("2d")
    let index = 0

    for (let y = 0; y < tilePattern; y++) {
        for (let x = 0; x < tilePattern; x++) {
            ctx.drawImage(images[index], x*tileWidth, y*tileHeight, tileWidth, tileHeight)
            index++
            
        }
    }
    return canvas
}
