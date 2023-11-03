import { Input, Box, FormControl  } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import './Prompt.css';



export default function Prompt(){
    const [placeholder, setPlaceholder] = useState('Enter your prompt here');
    const [isFading, setIsFading] = useState(false);


    useEffect(() => {
        const placeholders = ['chill day at the river', 'late night drive', 'high energy electronic workout', 'soothing music to focus'];
        let currentIndex = 0;
    
        const interval = setInterval(() => {
          setIsFading(true);
    
          setTimeout(() => {
            setPlaceholder(placeholders[currentIndex]);
            setIsFading(false);
    
            currentIndex = (currentIndex + 1) % placeholders.length;
          }, 500); // Adjust the duration of fading as needed
        }, 3000); // Change the text every 2 seconds
    
        return () => clearInterval(interval);
      }, []);

    return(
        <Input 
            placeholder={placeholder}
        />
    );
}



