import "./Cell.css"

function TrailerLink({anime}){
        if(anime.trailer?.site === "youtube"){
            let hrf = `https://www.youtube.com/watch?v=${anime.trailer.id}`
            return <a href={hrf}>Trailer</a>
        } else {
            return "No Trailer";
        }
}

function aniTitle(anime){
    if(anime.title.english) {
        return anime.title.english;
    } else {
        return anime.title.romaji;
    }
}

export function Cell(props) {
    let anime = props.anime
    return (
        <div className="cell" style={{"--poster-color": anime.coverImage.color}}>
            <div className="splash">
                <img className="poster" src={anime.coverImage?.large} alt="Anime Poster"/>
            </div>
            <div className="info">
                <h3 className="title"> 
                    {aniTitle(anime)}
                </h3>
                <div className="trailer">
                    <TrailerLink anime={anime}/>
                </div>
                <div className="synopsis">
                    {anime.description}
                </div>
                <div className="tags">
                    {anime.genres.map(tag => <div className="tag" data-tag={tag} key={tag}>{tag}</div>) }
                </div>
                <div className="points">
                </div>
            </div>
        </div>
    )
}


export function SelectableCell({anime, selected, onSelect}) {

    function onChange(event) {
        let selected = event.target.checked
        console.log(event.value, event.checked, selected)
        onSelect(selected, anime.id)
    }

    return (
        <div className={selected ? "cell" : "cell inactive"} style={{"--poster-color": anime.coverImage.color}}>
            <div className="splash">
                <img className="poster" src={anime.coverImage?.large} alt="Anime Poster"/>
            </div>
            <div className="info">
                <h3 className="title"> 
                    {aniTitle(anime)}
                </h3>
                <div className="trailer">
                    <TrailerLink anime={anime}/>
                </div>
                <div className="synopsis">
                    {anime.description}
                </div>
                <div className="tags">
                    {anime.genres.map(tag => <div className="tag" data-tag={tag} key={tag}>{tag}</div>) }
                </div>
                <div className="points">
                    <input type="checkbox" name="qualified" checked={selected} onChange={onChange}/>
                </div>
            </div>
        </div>
    )
}