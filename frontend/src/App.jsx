import { useState } from 'react'
import './App.css'
import ButtonData from './Component'
import SpotifySignIn from './SpotifySignIn'
import SpotifySignOut from './SpotifySignOut'
import GetAccessToken from './Getaccesstoken'

function App() {

  return (
    <>
      <ButtonData />
      <SpotifySignIn />
      <SpotifySignOut />
      <GetAccessToken />
    </>
  )
}

export default App
