import { Link } from "react-router-dom"
import "./TopBar.css"




export default function TopBar() {
    return (
        <>
      <div className="header">
        <Link to={"/"}><b>Sult</b>stua</Link>
        <button className="logInButton" type="button" onClick={()=>null}>log in</button>
      </div>
      <div className="topbar">
        <ul className="categoryTopBar">
            <li>
                <Link to={"/createTournament"}>Create tournament</Link>
            </li>
            <li>
                <a>Test</a>
            </li>
            <li>
                <a>Test</a>
            </li>
        </ul>
      </div>
    </>
    )
}