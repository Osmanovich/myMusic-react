import axios from "axios";

export default function addSong(song){
    return axios(`http://localhost:8080/api/v1/song`, {
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS, POST, PUT",
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000/",
        },
        method: 'POST',
        data: {
            songName: song.songName,
            artistName: song.artistName,
            url: song.url,
            rating: song.rating,
            favourite: song.favourite,
        }
    })
}
