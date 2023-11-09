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
    const urlParams = new URLSearchParams(window.location.search);
    const valueFromURL = urlParams.get('signedIn');
    if(valueFromURL === 'true'){
      setSignedIn(true);
    }
    console.log(signedIn);
  })

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
