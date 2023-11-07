import { Text, OrderedList, ListItem } from '@chakra-ui/react';
import './Directions.css';

export default function Directions(){
    return(
        <Text align='left' color='white'>
            <OrderedList>
                <ListItem>Connect your spotify account</ListItem>
                <ListItem>Enter a prompt for your playlist</ListItem>
                <ListItem>Select the number of songs</ListItem>
                <ListItem>Generate playlist!</ListItem>
            </OrderedList>
        </Text>
    );
}