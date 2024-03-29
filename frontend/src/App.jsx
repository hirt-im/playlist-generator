import { useEffect, useState } from 'react'
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
  const [accessToken, setAccessToken] = useState(null);

  const frontendURL = 'https://songguru.netlify.app/';
  const backendURL = 'https://songguru.onrender.com/';

  // Get Spotify access token from cookie and send to backend if it exists 
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
      // Return null if access token cookie does not exist
      return null;
    };

    const accessToken = getCookie('access_token');
    if(accessToken){
      setAccessToken(accessToken);
      setSignedIn(true);
    }
  }, []); 

  // async function storeToken(accessToken){
  //   await axios.post('https://songguru.onrender.com/storeToken', {
  //     data: accessToken,
  //   })
  // }

  return (
    <div className='container'>
      {(!playlistID ?
        <Directions signedIn={signedIn} />
          : 
        <div className='playlist'>
          <DeletePlaylist playlistID={playlistID} 
                          setPlaylistDeleted={setPlaylistDeleted} 
                          playlistDeleted={playlistDeleted} 
                          accessToken={accessToken} 
                          backendURL={backendURL} />     
                            
          <Playlist       playlistID={playlistID} />
        </div>
      )}
      <CreatePlaylistForm setPlaylistID={setPlaylistID} 
                          signedIn={signedIn} 
                          setPlaylistDeleted={setPlaylistDeleted} 
                          playlistDeleted={playlistDeleted} 
                          accessToken={accessToken} 
                          backendURL={backendURL} />
    </div>
  )
}

export default App
