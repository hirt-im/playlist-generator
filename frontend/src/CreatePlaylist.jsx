import { Button, ButtonGroup } from '@chakra-ui/react'


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


    

    return(
        <Button onClick={CreatePlaylist}>Create Playlist</Button>
    );
}