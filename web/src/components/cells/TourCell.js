import "./TourCell.css"
import { Link } from "react-router-dom"

export default function TourCell({tour}) {
    console.log("hello from TourCell")
    return (
        <>
        <div className="tourCell">
            <div className="tourSplash">
                <img className="tourPoster" alt="" src={tour.splash}></img>
                <Link className="tourName" to={"/tournament/"+tour.id}>{tour.name}</Link>
            </div>
        </div>
        </>
    )
}