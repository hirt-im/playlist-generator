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
import Loading from './Loading';
import LoadingButton from './LoadingButton';



export default function CreatePlaylistForm(props){
    const [placeholder, setPlaceholder] = useState('Enter your prompt here');
    const [prompt, setPrompt] = useState('');
    const [numSongs, setNumSongs] = useState(10);
    const [loading, setLoading] = useState(false);
    const placeholders = [
        'late night drive', 
        'high energy electronic workout', 
        'soothing music to focus',
        'music similar to The Marias',
        'best pop hits of the early 2000s'
    ];

    //Iterate through placeholder examples every 3 seconds
    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {    
            setPlaceholder(placeholders[currentIndex]);
            currentIndex = (currentIndex + 1) % placeholders.length;
        }, 3000); 
        return () => clearInterval(interval);
      }, []);

    //Submit form to create playlist, then set playlistID to newly created playlist
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        const result = await fetch('http://localhost:3001/api/gpt', {
              method: 'POST',
              body: JSON.stringify({prompt, numSongs}),
              headers: { 'Content-Type': 'application/json' },
            });
        const playlistID = await result.json();
        console.log(playlistID);
        props.setPlaylistID(playlistID);
        setLoading(false);
        props.setPlaylistDeleted(false);
    }

 

    return(
        <div id='form'>
            <FormControl className='form'>
                <Stack direction='column' spaceing={2}>
                    <Input 
                        className='input'
                        type='text'
                        placeholder={placeholder}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        size='lg'
                        color='white'
                        id='prompt-input'
                    />
                    
                    <Stack direction ='column' spaceing={2} bg='transparent' borderRadius={7} p={2}>
                        <Text className='slider-label' fontWeight='semibold' color='white'>Number of Songs</Text>
                        <Slider
                            className='slider'
                            min={5}
                            max={30}
                            step={1}
                            value={numSongs}
                            onChange={(e) => {setNumSongs(e)}}
                        >
                            <SliderTrack>
                                {/* <SliderFilledTrack /> */}
                            </SliderTrack>
                            <SliderThumb>
                                {/* <Text position='relative' top='-25px'>
                                    {numSongs}
                                </Text> */}
                                <Box
                                    as="span"
                                    fontSize="sm"
                                    color="white"
                                    bg="cyan.500"
                                    // p={1}
                                    pr={1}
                                    pl={1}
                                    borderRadius={50}
                                    position="relative"
                                >
                                        {numSongs}
                                </Box>
                            </SliderThumb>
                        </Slider>
                    </Stack>

                    {/* <Button className='generate-button' size='lg' colorScheme="telegram" onClick={handleSubmit} isDisabled={!props.signedIn || loading}>
                            Generate Playlist!
                    </Button>  
                     */}
                    {(!loading ? 
                        <Button className='generate-button' size='lg' colorScheme="telegram" onClick={handleSubmit} isDisabled={!props.signedIn}>
                            Generate Playlist!
                        </Button> :  
                        <LoadingButton />
                    )}
                    
                    
                </Stack>
            </FormControl>
            {/* {loading && <Loading />} */}
        </div>
    );
}




