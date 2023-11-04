import { Component, useState } from 'react'
import './App.css'
import SpotifySignIn from './SpotifySignIn'
import SpotifySignOut from './SpotifySignOut'
import GetAccessToken from './Getaccesstoken'
import Playlist from './Playlist'
import CreatePlaylistForm from './CreatePlaylistForm'

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [playlistID, setPlaylistID] = useState(null);

  return (
    <>
      <SpotifySignIn />
      <SpotifySignOut />
      <GetAccessToken />
      <Playlist playlistID={playlistID} />
      <CreatePlaylistForm setPlaylistID={setPlaylistID} />
    </>
  )
}

export default App
