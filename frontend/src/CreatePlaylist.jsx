import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from 'axios';


export default function CreatePlaylist(){
    function CreatePlaylist(){
        console.log('test');


        fetch('http://localhost:3001/api/createPlaylist')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const handleClick = async () => {
        try {
          // Make a GET request to your Express route
          const response = await axios.get('http://localhost:3001/api/createPlaylistAxios');
          console.log('Response:', response.data);
          // You can handle the response data or update the UI as needed
        } catch (error) {
          console.error('Error:', error);
          // Handle errors here, such as displaying an error message to the user
        }
      };


    

    return(
        <Button onClick={handleClick}>Create Playlist</Button>
    );
}