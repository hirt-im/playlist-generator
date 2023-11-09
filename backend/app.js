const express = require('express');
const cors = require('cors'); // Import the cors module
const session = require('express-session');
// const crypto = require('crypto');
const https = require('https');
const http = require('http');
const querystring = require('querystring');
const dotenv = require('dotenv');
dotenv.config(); //
const axios = require('axios');
const cookieParser = require('cookie-parser');




const SECRET_KEY = process.env.SECRET_KEY;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CLIENT_ID = '642dc66687df41d5bd1a31d677e8f0a6';
const REDIRECT_URI = 'http://localhost:3001/auth/callback';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';







const app = express();
app.use(cookieParser());

const FRONTEND_URL = 'http://localhost:5173'


const spotifyApiBaseUrl = 'api.spotify.com';
const spotifyAuthEndpoint = '/api/token';
const spotifyAuth = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
};

let accessToken = null;

// app.use(cors());

app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));


//WHY DONT THIS WORK
app.use(cors({
    origin: FRONTEND_URL, // Set to the frontend's URL
}));

app.use(express.json());





//handle Spotify Sign In and store access token
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
          // console.log(tokenData);
  
          // Handle the response from Spotify
          // const { access_token, refresh_token } = tokenData;
        //   res.json(tokenData);

          req.session.accessToken = tokenData;
          accessToken = tokenData;

          res.cookie('access_token', accessToken.access_token, {httpOnly: true, secure: false})
          console.log(accessToken)
          res.redirect(FRONTEND_URL);

          //redirect to frontend

        //   res.redirect('http://localhost:5173');
  
          // Store or use the access_token and refresh_token as needed
          // Typically, you would save these tokens securely and associate them with the user.
  
        //   res.send('Authentication successful! Tokens received.');
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



app.get('/get-access-token', (req, res) => {
  const accessToken = req.cookies.access_token;
  console.log(accessToken);
  res.json({ accessToken });
})




//give access token to front end
//WHY DOESNT THIS WORK
app.get('/profile', (req, res) => {
  console.log('test');
// Retrieve the access token from the session
    const accessToken = req.session.accessToken;
    console.log(req.session.accessToken);

    // if (!accessToken) {
    //     return res.status(401).send('Access token not found in the session.');
    // }

    // Respond with the access token as JSON
    // res.json(accessToken);
});


//Create spotify playlist
app.get('/api/createPlaylist', (req, res) => {

  const songURIs = [
    'spotify:track:4iV5W9uYEdYUVa79Axb7Rh', // Example song 1
    'spotify:track:6zHsJDzQ2n2CJLsU4n5WbR', // Example song 2
    'spotify:track:1A2GTWGtFfWp7KSQTwFvXh', // Example song 3
    // Add more song URIs as needed
  ];

  // Replace with a valid access token
  console.log('create playlist', accessToken);
  // return;

  // Define the playlist details
  const playlistData = {
    name: 'My New Playlist',
    public: false, // Set to true for a public playlist
  };

  // Prepare the request payload
  const payload = JSON.stringify(playlistData);

  const options = {
    method: 'POST',
    hostname: spotifyApiBaseUrl,
    path: '/v1/me/playlists',
    headers: {
      'Authorization': `Bearer ${accessToken.access_token}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  // Send the request to the Spotify API
  const reqSpotify = https.request(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      if (resp.statusCode === 201) {
        const playlistId = JSON.parse(data).id;
        console.log('playlistid: ', playlistId);
        // Step 2: Add Songs to the Playlist
        const addSongsData = { uris: songURIs };
        const addSongsDataString = JSON.stringify(addSongsData);

        const addSongsOptions = {
          hostname: 'api.spotify.com',
          port: 443,
          path: `/v1/playlists/${playlistId}/tracks`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(addSongsDataString),
            'Authorization': `Bearer ${accessToken.access_token}`,
          },
        };

        const addSongsReq = http.request(addSongsOptions, (addSongsRes) => {
          let addSongsData = '';

          addSongsRes.on('data', (chunk) => {
            addSongsData += chunk;
          });

          addSongsRes.on('end', () => {
            if (addSongsRes.statusCode === 201) {
              res.status(200).json({ message: 'Playlist created and songs added successfully' });
            } else {
              console.error('Error adding songs:', addSongsData);
              res.status(500).json({ error: 'Failed to add songs to the playlist' });
            }
          });
        });

        addSongsReq.write(addSongsDataString);
        addSongsReq.end();
      } else {
        console.error('Error creating playlist:', data);
        res.status(500).json({ error: 'Failed to create playlist' });
      }
    });
  

      }
    );
  

  reqSpotify.write(payload);
  reqSpotify.end();
});


//Trying axios
app.get('/api/createPlaylistAxios', async (req, res) => {
  try {
    // Replace with a valid access token

    // Define the playlist details
    const playlistData = {
      name: 'My Epic Playlist',
      description: 'Testing description for the playlist.',
      public: false, // Set to true for a public playlist
    };

    // Create a playlist
    const createPlaylistResponse = await axios.post('https://api.spotify.com/v1/me/playlists', playlistData, {
      headers: {
        'Authorization': `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    const playlistId = createPlaylistResponse.data.id;

    // Define the song URIs
    const songURIs = [
      'spotify:track:4oSjxxsZnPHZLOnkPri7Po',
      'spotify:track:4aQ8mFkZU6dmHaZOOKdscc',
      'spotify:track:5pZVsZ8TOGly1KnYFmZ61B',
      // Add more song URIs as needed
    ];

    // Add songs to the playlist
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, songURIs, {
      headers: {
        'Authorization': `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json({ message: 'Playlist created and songs added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create playlist or add songs' });
  }
});


async function CreatePlaylist(name, songURIs){

  try {
    const playlistData = {
      name: name,
      description: 'Created using Spotify Playlist Generator by Michael Hirt',
      public: false, // Set to true for a public playlist
    };

    // Create a playlist
    const createPlaylistResponse = await axios.post('https://api.spotify.com/v1/me/playlists', playlistData, {
      headers: {
        'Authorization': `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    const playlistId = createPlaylistResponse.data.id;


    // Add songs to the playlist
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, songURIs, {
      headers: {
        'Authorization': `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json',
      }
    });

    return playlistId;

  } catch (error) {
    console.error('Error:', error);
  }
}

// const { Configuration, OpenAIApi } = require('openai');

// const config = new Configuration({
//   apiKey: CHATGPT_KEY,
// });

// const openai = new OpenAIApi(config);



const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.CHATGPT_KEY, 
});

// Create spotify playlist, add songs to it, return playlistID to frontend
app.post('/api/gpt', async (req, res) => {
  const prompt = req.body.prompt;
  const numSongs = req.body.numSongs;
  // const chatInput = 'Please generate a list of ' + numSongs + ' songs that are on Spotify with the theme of: ' + prompt;
  const chatInput = 'Generate a playlist of songs that are on spotify. The theme of the playlist is: ' + prompt +'. The list should be numbered and include ' + numSongs + ' songs.';

  console.log(req.body.prompt);

    try{
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: chatInput }],
        model: 'gpt-3.5-turbo',
      });
      console.log(chatCompletion.choices);


      // turn response into array of songs
      const lines = chatCompletion.choices[0].message.content.split('\n');
      const songs = [];

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


//Get spotify song URIs from list of songs
async function GetSongURIs(songList){
  let songURIs = [];


  await Promise.all(
    songList.map(async (song) => {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(song)}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken.access_token}`,
        },
      });

      const data = await response.json();
      if (data.tracks.items.length > 0) {
        songURIs.push(data.tracks.items[0].uri);
      } else {
        console.log('song not found');
        // Handle the case where the song is not found
        // You can push null or take another action as needed
        // songURIs.push(null);
      }
    })
  );

  console.log(songURIs);
  return songURIs;
};























// Enable CORS for all routes

// Define your API routes here
app.get('/api/data', (req, res) => {
  const data = { message: 'Hello from the backend!' };
  res.json(data);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

