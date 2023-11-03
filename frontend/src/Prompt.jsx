import { Input, Box, FormControl, Stack, Button  } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import './Prompt.css';



export default function Prompt(){
    const [placeholder, setPlaceholder] = useState('Enter your prompt here');
    const [inputValue, setInputValue] = useState('');


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
              body: JSON.stringify({inputValue}),
              headers: { 'Content-Type': 'application/json' },
            });
            const data = await result.json();
            console.log(data);
    }

    return(
        <FormControl>
            <Stack direction='row' spaceing={2}>
                <Input 
                    type='text'
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button colorScheme="blue" onClick={handleSubmit}>
                    Submit
                </Button>
            </Stack>
        </FormControl>
    );
}


