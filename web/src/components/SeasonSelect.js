


export default function SeasonSelect({onSeasonSelect}) {
    
    function onSubmit(event) {
        event.preventDefault()
        let formData = new FormData(event.target)
        let {season, seasonYear} = Object.fromEntries(formData)
        onSeasonSelect(season, parseInt(seasonYear))
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