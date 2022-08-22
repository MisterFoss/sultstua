import './App.css';
import { Tour } from './pages/Tour';
import {TourList} from "./pages/TourList.js"
import {
	BrowserRouter,
	Route,
	Routes
} from "react-router-dom";
import CreateTour from './pages/CreateTour';
import Canvas from './components/Canvas';

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TourList/>}/>
                    <Route path='/tournament/:id' element={<Tour/>}/>
                    <Route path="/createTournament" element={<CreateTour/>}/>
                    <Route path="/image" element={<Canvas/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


