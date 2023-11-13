import './LoadingButton.css';
import React, { useState, useEffect } from 'react';
import { Button, Box } from '@chakra-ui/react';

export default function DeletePlaylist(props){



    async function deletePlaylist(){
        try {
            const response = await fetch('http://localhost:3001/deletePlaylist', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              props.setPlaylistDeleted(true);
            } else {
              console.error('Error deleting playlist:', errorData);
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    if(!props.playlistDeleted){
        return (
            <Button width={370} size='lg' colorScheme="red" onClick={deletePlaylist}>
                Unfollow Playlist
            </Button>
        );
    }

    return(
        <Button width={370} size='lg' colorScheme="red" onClick={deletePlaylist} isDisabled={true}>
            Playlist Unfollowed!
        </Button>
      );
};





