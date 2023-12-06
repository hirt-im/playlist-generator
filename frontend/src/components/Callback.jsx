import { useEffect } from 'react';
import './Callback.css';


export default function Callback(){
    const frontendURL = 'https://songguru.netlify.app/';
    const backendURL = 'https://songguru.onrender.com/';

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let code = params.get('code');

        fetch(backendURL + 'signIn?code=' + code)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCookie(data);
            window.location.href = frontendURL;
        })
    }, [])

    function setCookie(accessToken){
        let date = new Date();
        date.setTime(date.getTime() + (60 * 60 * 1000));
        let expires = '; expires=' + date.toUTCString();
        document.cookie = "access_token=" + accessToken + expires + "; path=/";
    }

    return(
        <div id='callback'>Signing in...</div>
    );
}