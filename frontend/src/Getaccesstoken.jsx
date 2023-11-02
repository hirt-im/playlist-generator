import { Button, ButtonGroup } from '@chakra-ui/react'
import { useState } from 'react';


export default function GetAccessToken(){
    const [token, setToken] = useState('null');
    function GetToken(){


        fetch('http://localhost:3001/profile', {
            method: 'GET',
          })
            .then(response => {
              if (response.status === 401) {
                console.error('Access token not found in the session.');
                return null;
              }
              return response.json();
            })
            .then(data => {
                console.log(data);
              if (data && data.accessToken) {
                // Use the access token from the response
                const accessToken = data.accessToken;
                console.log(accessToken);
                
                // You can now use the access token for making authorized requests to Spotify or other APIs.
              }
            })
            .catch(error => {
              console.error('Error fetching access token:', error);
            });


    }

    return(
        <Button onClick={GetToken}>{token}</Button>
    );
}