import { Text, OrderedList, ListItem } from '@chakra-ui/react';
import './Directions.css';
import SpotifySignIn from './SpotifySignIn';
import { useState } from 'react';

export default function Directions(){
    const [signedIn, setSignedIn] = useState(false);

    if(!signedIn)return(
        <Text width='375px' align='left' color='white'>
            <SpotifySignIn setSignedIn={setSignedIn}/>
            &nbsp;, then enter a prompt for your playlist. This prompt can be anything. Use it to make a theme for a specific event or activity,
            or to find songs that fit a certain mood or are similar to a different artist. You can be as specific or broad as you like, the app will take it from there!
            {/* <OrderedList>
                <ListItem>Connect your spotify account</ListItem>
                <ListItem>Enter a prompt for your playlist</ListItem>
                <ListItem>Select the number of songs</ListItem>
                <ListItem>Generate playlist!</ListItem>
            </OrderedList> */}
        </Text>
    );

    return(
        <Text width='375px' align='left' color='white'>
            Enter a prompt for your playlist. This prompt can be anything. Use it to make a theme for a specific event or activity,
            or to find songs that fit a certain mood or are similar to a different artist. You can be as specific or broad as you like, the app will take it from there!
            {/* <OrderedList>
                <ListItem>Connect your spotify account</ListItem>
                <ListItem>Enter a prompt for your playlist</ListItem>
                <ListItem>Select the number of songs</ListItem>
                <ListItem>Generate playlist!</ListItem>
            </OrderedList> */}
        </Text>
    );
}