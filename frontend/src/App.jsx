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

  useEffect(() => {
    axios.get('http://localhost:3001/get-access-token')
    .then(response => {
      const accessToken = response.data.accessToken;
      console.log(response.data);
      // Use the access token as needed
    })
    .catch(error => {
      console.error('Error retrieving access token:', error);
    });
    })

  return (
    <div className='container'>
      <Directions />
      {/* <RainbowGlowingBorderInput /> */}
      {/* <SpotifySignIn /> */}
      {/* <SpotifySignOut /> */}
      {/* <GetAccessToken /> */}
      <CreatePlaylistForm setPlaylistID={setPlaylistID} />
      <Playlist playlistID={playlistID} />
      {/* <ToggleColorMode /> */}
    </div>
  )
}

export default App
