import logo from './logo.svg';
import './App.css';
import {Cell} from "./components/Cell"
import {getTourData} from "./service/api"
import { useState } from 'react';


function App() {
  
  const [tourData, setTourData] = useState(null);
  getTourData(1).then(setTourData)
  if(tourData == null) {
    return null
  }
  return (
    <div className="App">
      <h1 className='tourName'>
        {tourData.tournamentName}
      </h1>
      {tourData.animes.map(anime => <Cell anime={anime}/>)} 
    </div>
  );
}

export default App;
