const express = require('express');
const cors = require('cors'); // Import the cors module
const session = require('express-session');
// const crypto = require('crypto');
const https = require('https');
const http = require('http');
const querystring = require('querystring');
const dotenv = require('dotenv');
dotenv.config(); //

const secretKey = 'cfa025f29abecaac90cc39a3f6faf2fe1a78c259d963abcef83e4bb057259bb8';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CLIENT_ID = '642dc66687df41d5bd1a31d677e8f0a6';
const REDIRECT_URI = 'http://localhost:3001/auth/callback';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

const app = express();

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
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));


//WHY DONT THIS WORK
app.use(cors({
    origin: FRONTEND_URL, // Set to the frontend's URL
}));





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
        res.status(200).send(`Created playlist with ID: ${playlistId}`);
      } else {
        console.error('Error creating playlist:', data);
        res.status(resp.statusCode).send('Failed to create the playlist.');
      }
    });
  });

  reqSpotify.write(payload);
  reqSpotify.end();
});


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

