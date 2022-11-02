
export function TrailerEmbed({anime}){
    if(anime?.trailer?.site === "youtube"){
        let hrf = `https://www.youtube.com/embed/${anime.trailer.id}`
        return <iframe 
            src={hrf}
            className="embedTrailer" 
            title="tailer" 
            allowFullScreen
            frameBorder={0}
            />
    } else {
        return "";
    }
}