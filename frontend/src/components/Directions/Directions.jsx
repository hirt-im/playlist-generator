import { Text, OrderedList, ListItem, Heading, Stack } from '@chakra-ui/react';
import './Directions.css';
import SpotifySignIn from '../SpotifySignIn';


export default function Directions(props){
    return(
        <Stack className='intro-container'>
            <Heading fontSize={45} color='white'>SongGuru</Heading>
            <Text className='directions' fontSize={18} pb={2} width='375px' align='left' color='white'>
                SongGuru utilizes ChatGPT to generate a Spotify playlist based on a prompt. The prompt is a theme for your playlist. It can be anything.
                Use it to make a playlist for a specific event or activity,
                or to find songs that fit a certain mood or are similar to another artist. You can be as specific or broad as you like, 
                the app will take it from there! It's simple to use, just:<br></br>
                <OrderedList ml={20} className='list'>
                    {!props.signedIn && <ListItem><SpotifySignIn/></ListItem>}
                    <ListItem>Enter a theme for your playlist</ListItem>
                    <ListItem>Select the number of songs</ListItem>
                    <ListItem>Generate playlist!</ListItem>
                </OrderedList>
            </Text>
        </Stack>
    );
}

