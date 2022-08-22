import TourCell from "../components/TourCell";
import {getTourList} from "../service/api"
import { useApi } from "../components/hooks/useApi";
import Layout from "../components/Layout";


export function TourList() {
    console.log("hello form tourlist")
    const tourList = useApi(getTourList)
    
    if(tourList == null) {
        return (
            <Layout/>
        )
    }
    
    return (
        <Layout>
            <h1 className='tourList'>
                I am a Tour List
            </h1>
            <div className="list">
                {tourList.map(tour => <TourCell tour={tour} key={tour.id}/>)} 
            </div>
        </Layout>
    );
}