import { Component, useState } from 'react'
import './App.css'
import SpotifySignIn from './SpotifySignIn'
import SpotifySignOut from './SpotifySignOut'
import GetAccessToken from './Getaccesstoken'
import Playlist from './Playlist'
import CreatePlaylistForm from './CreatePlaylistForm'
import ToggleColorMode from './ToggleColorMode'
import Directions from './Directions'

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [playlistID, setPlaylistID] = useState(null);

  return (
    <div className='container'>
      <Directions />
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
