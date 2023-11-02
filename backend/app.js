const express = require('express');
const cors = require('cors'); // Import the cors module
const session = require('express-session');
const crypto = require('crypto');
const https = require('https');
const querystring = require('querystring');
const dotenv = require('dotenv');
dotenv.config(); //

const secretKey = crypto.randomBytes(32).toString('hex');
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CLIENT_ID = '642dc66687df41d5bd1a31d677e8f0a6';
const REDIRECT_URI = 'http://localhost:3001/auth/callback';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

const app = express();

// app.use(cors());

//WHY DONT THIS WORK
app.use(cors({
    origin: 'http://localhost:5173', // Set to the frontend's URL
  }));


app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  }));



//handle Spotify Sign In
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
  
          // Handle the response from Spotify
          const { access_token, refresh_token } = tokenData;
        //   res.json(tokenData);

          req.session.accessToken = tokenData;
          console.log(req.session.accessToken);
          res.redirect('http://localhost:5173');

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


app.get('/profile', (req, res) => {
// Retrieve the access token from the session
    const accessToken = req.session.accessToken;
    // console.log(accessToken);

    if (!accessToken) {
        return res.status(401).send('Access token not found in the session.');
    }

    // Respond with the access token as JSON
    res.json(accessToken);
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

