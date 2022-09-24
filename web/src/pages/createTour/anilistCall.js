let query = `
    query (
        $season: MediaSeason,
        $seasonYear: Int
    ){
        Page {
            pageInfo {
                hasNextPage
                total
            }
            media(
                season: $season
                seasonYear: $seasonYear
                sort: TITLE_ROMAJI, 
                format:TV
            ) {
                id,
                popularity
                description
                title {
                    romaji
                    english
                }
                coverImage {
                    large,
                    color
                },
                trailer {
                    site
                    thumbnail
                    id
                },
                genres,
                averageScore,
                relations {
                    edges {
                        id
                        relationType
                    }
                }
            }
        }
    }
`;

export async function fetchAnimeBySeason(season, seasonYear){

    let response = await fetch("https://graphql.anilist.co/", {
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            query,
            variables: {
                season,
                seasonYear
            }
        }),
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    });
    console.log(response, response.status);
    let json = await response.json();
    console.log(json);
    return json.data.Page.media;
}