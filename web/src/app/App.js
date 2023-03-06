import './App.css';
import { Tour } from '../pages//tourView/Tour';
import {TourList} from "../pages/tourIndex/TourList.js"
import {
	BrowserRouter,
	Route,
	Routes
} from "react-router-dom";
import CreateTour from '../pages/createTour/CreateTour';

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TourList/>}/>
                    <Route path='/tournament/:id' element={<Tour/>}/>
                    <Route path="/createTournament" element={<CreateTour/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


