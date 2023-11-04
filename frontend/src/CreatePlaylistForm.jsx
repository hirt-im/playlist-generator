import { Input, Box, FormControl, Stack, Button, Text  } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'
import './CreatePlaylistForm.css';



export default function CreatePlaylistForm(props){
    const [placeholder, setPlaceholder] = useState('Enter your prompt here');
    const [prompt, setPrompt] = useState('');
    const [numSongs, setNumSongs] = useState(10);


    useEffect(() => {
        const placeholders = ['chill day at the river', 'late night drive', 'high energy electronic workout', 'soothing music to focus'];
        let currentIndex = 0;
    
        const interval = setInterval(() => {    
            setPlaceholder(placeholders[currentIndex]);
            currentIndex = (currentIndex + 1) % placeholders.length;
        }, 3000); // Change the text every 2 seconds
    
        return () => clearInterval(interval);
      }, []);

    async function handleSubmit(){
        const result = await fetch('http://localhost:3001/api/gpt', {
              method: 'POST',
              body: JSON.stringify({prompt, numSongs}),
              headers: { 'Content-Type': 'application/json' },
            });



            const playlistID = await result.json();
            console.log(playlistID);
            props.setPlaylistID(playlistID);
        
    }

    // function handleSubmit(){
    //     fetch('http://localhost:3001/api/gpt', {
    //           method: 'POST',
    //           body: JSON.stringify({prompt, numSongs}),
    //           headers: { 'Content-Type': 'application/json' },
    //         })
    //         .then((response) => {
    //             if (!response.ok) {
    //               throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //           })
    //           .then((data) => {
    //             console.log(data); // Log the returned value to the console
    //             // You can use the 'data' variable here
    //           })
    //           .catch((error) => {
    //             console.error('Error:', error);
    //           });
        
    // }

 

    return(
        <FormControl>
            <Stack direction='column' spaceing={2}>
                <Input 
                    type='text'
                    placeholder={placeholder}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <Button colorScheme="blue" onClick={handleSubmit}>
                    Create Playlist!
                </Button>
                <Slider
                    min={5}
                    max={50}
                    step={1}
                    value={numSongs}
                    onChange={(e) => {setNumSongs(e)}}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb>
                        <Text position='relative' top='-25px'>
                            {numSongs}
                        </Text>
                    </SliderThumb>
                </Slider>
            </Stack>
        </FormControl>
    );
}




