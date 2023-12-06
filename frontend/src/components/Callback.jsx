import { useEffect } from 'react';
import './Callback.css';

export default function Callback(){
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let code = params.get('code');

        fetch('https://songguru.onrender.com/signIn?code=' + code)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })

    })
    return(
        <div id='callback'>Callback page</div>
    );
}