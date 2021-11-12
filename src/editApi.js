import axios from "axios";

export default function editSong(song){
    return axios(`http://localhost:8080/api/v1/song/${song.id}?songName=${song.songName}&artistName=${song.artistName}&songUrl=${song.url}`, {
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS, POST, PUT",
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000/",
        },
        method: 'PUT',
        
    })
}
