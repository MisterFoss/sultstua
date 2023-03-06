import { getTourList } from "../../app/api";
import Layout from "../../app/layout/Layout";
import { useApi } from "../../utils/useApi";
import TourCell from "./TourCell";


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