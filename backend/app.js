const express = require('express');
const cors = require('cors'); 
const session = require('express-session');
const https = require('https');
const http = require('http');
const querystring = require('querystring');
const dotenv = require('dotenv');
dotenv.config(); 
const axios = require('axios');
const cookieParser = require('cookie-parser');


const SECRET_KEY = process.env.SECRET_KEY;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CLIENT_ID = '642dc66687df41d5bd1a31d677e8f0a6';
const REDIRECT_URI = 'http://localhost:3001/auth/callback';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const FRONTEND_URL = 'http://localhost:5173'

let fullTokenData = null;
let accessToken = null;
let currPlaylistID = null;

const app = express();
app.use(cookieParser());

app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(cors({
    origin: FRONTEND_URL, 
}));

app.use(express.json());


// Handle Spotify sign in and store access token
app.get('/auth/callback', (req, res) => {
  // Extract the authorization code from the query parameters
  const authorizationCode = req.query.code;
  if (!authorizationCode) {
    return res.status(400).send('Authorization code not provided.');
  }

  // Define the data to send in the POST request to exchange the code for tokens
  const data = querystring.stringify({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: REDIRECT_URI,
  });

  // Configure the POST request options
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
    },
  };

  // Make the POST request to exchange the code for tokens
  const request = https.request(SPOTIFY_TOKEN_URL, options, (response) => {
    let responseData = '';

    response.on('data', (chunk) => {
      responseData += chunk;
    });

    response.on('end', () => {
      try {
        const tokenData = JSON.parse(responseData);
        req.session.accessToken = tokenData;
        fullTokenData = tokenData;
        accessToken = tokenData.access_token;

        // create cookie with access token data that expires after 1 hour
        res.cookie('access_token', accessToken, {httpOnly: false, secure: false, maxAge: 3600000})
        console.log(accessToken)

        //redirect to frontend
        res.redirect('http://localhost:5173');

      } catch (error) {
        console.error('Error parsing Spotify token response:', error);
        res.status(500).send('Error during token exchange.');
      }
    });
  });

  request.on('error', (error) => {
    console.error('Error making Spotify token request:', error);
    res.status(500).send('Error during token exchange.');
  });

  // Send the data and complete the request
  request.write(data);
  request.end();
});


// Get spotify song URIs from list of songs
async function GetSongURIs(songList){
  let songURIs = [];
  await Promise.all(
    songList.map(async (song) => {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(song)}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.tracks.items.length > 0) {
        songURIs.push(data.tracks.items[0].uri);
      } else {
        console.log('song not found');
      }
    })
  );
  console.log(songURIs);
  return songURIs;
};


// Create spotify playlist and add songs to it
async function CreatePlaylist(name, songURIs){
  try {
    const playlistData = {
      name: name,
      description: '',
      public: false, 
    };

    // Create a playlist
    const createPlaylistResponse = await axios.post('https://api.spotify.com/v1/me/playlists', playlistData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const playlistId = createPlaylistResponse.data.id;
    currPlaylistID = playlistId;

    // Add songs to the playlist
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, songURIs, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    return playlistId;

  } catch (error) {
    console.error('Error:', error);
  }
}


const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.CHATGPT_KEY, 
});

// Take form data from frontend, create Spotify playlist, return playlistID to frontend
app.post('/createPlaylist', async (req, res) => {
  const prompt = req.body.prompt;
  const numSongs = req.body.numSongs;
  const chatInput = 'Generate a playlist of songs that are on spotify. The theme of the playlist is: ' + prompt +'. The list should be numbered and include ' + numSongs + ' songs.';
  console.log(req.body.prompt);

    try{
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: chatInput }],
        model: 'gpt-3.5-turbo',
      });
      console.log(chatCompletion.choices);

      // turn response into array of songs
      const songs = [];
      const lines = chatCompletion.choices[0].message.content.split('\n');

      lines.forEach((line) => {
        const match = line.match(/"\s*(.*?)\s*" by (.*)$/);
        if (match) {
          const songName = match[1];
          const artist = match[2];
          songs.push(`${songName} by ${artist}`);
        }
      })
      console.log(songs);

      let songURIs = await GetSongURIs(songs);
      let playlistID = await CreatePlaylist(prompt, songURIs);
      res.json(playlistID);
    } 
      catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  }
);


app.delete('/deletePlaylist', async (req, res) => {
  console.log(currPlaylistID);
  try {
    const response = await axios.delete(
      `https://api.spotify.com/v1/playlists/${currPlaylistID}/followers`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error deleting playlist:', error.response.data);
    res.status(error.response.status).json(error.response.data);
  }
});


app.post('/storeToken', (req, res) => {
  accessToken = req.body.data;
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

