import { Component, useEffect, useState } from 'react'
import './App.css'
import SpotifySignIn from './SpotifySignIn'
import SpotifySignOut from './SpotifySignOut'
import GetAccessToken from './Getaccesstoken'
import Playlist from './Playlist'
import CreatePlaylistForm from './CreatePlaylistForm'
import ToggleColorMode from './ToggleColorMode'
import Directions from './Directions'
import RainbowGlowingInput from './Rainbow'
import RainbowGlowingBorderInput from './Rainbow'
import axios from 'axios';


function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [playlistID, setPlaylistID] = useState(null);

  // example playlist to test mobile styling
  // const [playlistID, setPlaylistID] = useState('5VHuLfM3pa4gCGzA19ZbDy');

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const valueFromURL = urlParams.get('signedIn');
  //   if(valueFromURL === 'true'){
  //     setSignedIn(true);
  //   }
  //   console.log(signedIn);
  // })


  useEffect(() => {
    // Function to get the value of a cookie by its name
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
        }
      }
      // Return null if the cookie with the specified name is not found
      return null;
    };

    // Get the value of the 'access_token' cookie
    const accessToken = getCookie('access_token');
    
    if (accessToken) {
      setSignedIn(true);




      // No longer necessary to check if token is valid, changed to make the cookie expire after 1 hour, which is when the access token expires
      // check if access token is valid, if it is, set signedIn to true
      // setSignedIn(CheckAccessToken(accessToken));
    } else {
      console.log('Access Token not found');
    }
  }, []); 



  async function CheckAccessToken(accessToken){
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      });
      console.log(response.ok);
      return response.ok;
  
    } catch (error) {
      console.error('Error while checking token validity:', error);
      return false;
    }
  }




  return (
    <div className='container'>
      <Directions signedIn={signedIn} />
      {/* <RainbowGlowingBorderInput /> */}
      {/* <SpotifySignIn /> */}
      {/* <SpotifySignOut /> */}
      {/* <GetAccessToken /> */}
      <CreatePlaylistForm setPlaylistID={setPlaylistID} signedIn={signedIn} />
      <Playlist playlistID={playlistID} />
      {/* <ToggleColorMode /> */}
    </div>
  )
}

export default App
