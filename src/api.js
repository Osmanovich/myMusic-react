import axios from "axios";

export default function getAllSong(){
    return axios('http://localhost:8080/api/v1/song', {
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS, POST, PUT",
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000/",
        },
        method: 'GET',
        
    })
}
