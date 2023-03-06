
export async function getTourData(tourId) {



    let response = await fetch("http://localhost:8001/api/getTournament/"+tourId, {
        "method": "GET",
        "mode": "cors",
        "credentials": "same-origin",
    });
    let tournamentData = await response.json();
    console.log(tournamentData);
    return tournamentData
};

export async function getTourList() {
    
    let response = await fetch("http://localhost:8001/api/getTourList", {
        "method": "GET",
        "mode": "cors",
        "credentials": "same-origin",
    });
    let tourList = await response.json();
    console.log(tourList);
    return tourList
}


export async function tourDataToDatabase(name, splash, list){
    let response = await fetch("http://localhost:8001/api/createTournament", {
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            name,
            splash,
            list
        }),
        "method": "POST",
    });
}

export async function voteToPrelim(anilist_id, tour_id, judge_id, score){
    let response = await fetch("http://localhost:8001/api/vote", {
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            anilist_id,
            tour_id,
            judge_id,
            score
        }),
        "method": "POST",
    });
}