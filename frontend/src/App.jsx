import { useState } from 'react'
import './App.css'
import ButtonData from './Component'
import SpotifySignIn from './SpotifySignIn'
import SpotifySignOut from './SpotifySignOut'
import GetAccessToken from './Getaccesstoken'
import Playlist from './Playlist'

function App() {

  return (
    <>
      <ButtonData />
      <SpotifySignIn />
      <SpotifySignOut />
      <GetAccessToken />
      <Playlist />
    </>
  )
}

export default App
