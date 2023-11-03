import { Component, useState } from 'react'
import './App.css'
import SpotifySignIn from './SpotifySignIn'
import SpotifySignOut from './SpotifySignOut'
import GetAccessToken from './Getaccesstoken'
import Playlist from './Playlist'
import CreatePlaylistForm from './CreatePlaylistForm'

function App() {

  return (
    <>
      <SpotifySignIn />
      <SpotifySignOut />
      <GetAccessToken />
      <Playlist />
      <CreatePlaylistForm />
    </>
  )
}

export default App
