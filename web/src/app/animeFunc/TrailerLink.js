

export function TrailerLink({anime}){
    if(anime.trailer?.site === "youtube"){
        let hrf = `https://www.youtube.com/watch?v=${anime.trailer.id}`
        return <a href={hrf}>Trailer</a>
    } else {
        return "No Trailer";
    }
}