import { Component, useEffect, useState } from 'react'
import './App.css'
import Playlist from './components/Playlist'
import CreatePlaylistForm from './components/CreatePlaylistForm/CreatePlaylistForm'
import Directions from './components/Directions/Directions'
import axios from 'axios';
import DeletePlaylist from './components/DeletePlaylist'


function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [playlistID, setPlaylistID] = useState(null);
  const [playlistDeleted, setPlaylistDeleted] = useState(false);

  // example playlist to test mobile styling
  // const [playlistID, setPlaylistID] = useState('4fYg5ISSUkrJIclevsewXU');

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

    // Send accesstoken to backend
    if (accessToken) {
      StoreToken(accessToken);
      setSignedIn(true);




      // No longer necessary to check if token is valid, changed to make the cookie expire after 1 hour, which is when the access token expires
      // check if access token is valid, if it is, set signedIn to true
      // setSignedIn(CheckAccessToken(accessToken));
    } else {
      console.log('Access Token not found');
    }
  }, []); 


  async function StoreToken(accessToken){
    await axios.post('http://localhost:3001/storeToken', {
      data: accessToken,
    })
  }

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
      {/* <DeletePlaylist /> */}
      {(!playlistID ?
        <Directions signedIn={signedIn} />
          : 
        <div className='playlist'>
          <DeletePlaylist playlistID={playlistID} setPlaylistDeleted={setPlaylistDeleted} playlistDeleted={playlistDeleted} />       
          <Playlist playlistID={playlistID} />
        </div>
      )}
      {/* <Directions signedIn={signedIn} /> */}
      {/* <RainbowGlowingBorderInput /> */}
      {/* <SpotifySignIn /> */}
      {/* <SpotifySignOut /> */}
      {/* <GetAccessToken /> */}
      <CreatePlaylistForm setPlaylistID={setPlaylistID} signedIn={signedIn} setPlaylistDeleted={setPlaylistDeleted} playlistDeleted={playlistDeleted} />
      {/* <ToggleColorMode /> */}
    </div>
  )
}

export default App
