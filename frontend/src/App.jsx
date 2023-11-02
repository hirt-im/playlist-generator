import { Component, useState } from 'react'
import './App.css'
import ButtonData from './Component'
import SpotifySignIn from './SpotifySignIn'
import SpotifySignOut from './SpotifySignOut'
import GetAccessToken from './Getaccesstoken'
import Playlist from './Playlist'
import CreatePlaylist from './CreatePlaylist'

function App() {

  return (
    <>
      <ButtonData />
      <SpotifySignIn />
      <SpotifySignOut />
      <GetAccessToken />
      <Playlist />
      <CreatePlaylist />
      <ButtonData />
    </>
  )
}

export default App
