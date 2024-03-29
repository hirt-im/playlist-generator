import { Button } from '@chakra-ui/react';


export default function DeletePlaylist(props){
    async function deletePlaylist(){
        let accessToken = props.accessToken;
        try {
            const response = await fetch(props.backendURL + 'deletePlaylist', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({accessToken})
            });
            props.setPlaylistDeleted(response.ok);
          }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <Button width={370} size='lg' colorScheme="red" onClick={deletePlaylist} isDisabled={props.playlistDeleted}>
            {(!props.playlistDeleted ? 'Unfollow Playlist' : 'Playlist Unfollowed!')}
        </Button>
    );
};

