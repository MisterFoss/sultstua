

export function animeTitle(anime){
    if(anime.title.english) {
        return anime.title.english;
    } else {
        return anime.title.romaji;
    }
}