import { useEffect } from 'react';
import './Callback.css';
import { useNavigate } from 'react-router-dom';


export default function Callback(){
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let code = params.get('code');

        fetch('https://songguru.onrender.com/signIn?code=' + code)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCookie(data);

            const navigate = useNavigate();
            navigate("/");
        })
    })


    function setCookie(accessToken){
        let date = new Date();
        date.setTime(date.getTime() + (60 * 60 * 1000));
        let expires = '; expires=' + date.toUTCString();
        document.cookie = "access_token=" + accessToken + expires + "; path=/";
    }
    return(
        <div id='callback'>Callback page</div>
    );
}