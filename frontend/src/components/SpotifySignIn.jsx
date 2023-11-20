import { Button } from '@chakra-ui/react'


export default function SpotifySignIn(props){
    function SignIn(){
        const CLIENT_ID = '642dc66687df41d5bd1a31d677e8f0a6';
        const REDIRECT_URI = 'http://localhost:3001/auth/callback';
        const scopes = ['playlist-modify-private', 'playlist-modify-public'];
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scopes}`;
        window.location.href = authUrl;
    }

    return(
        <Button colorScheme='whatsapp' onClick={SignIn}>Connect to Spotify</Button>
    );
}