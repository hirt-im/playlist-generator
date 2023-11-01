import { Button, ButtonGroup } from '@chakra-ui/react'

export default function ButtonData(){
    function handleClick(){
        console.log('test');
        fetch('http://localhost:3001/api/data')
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
        <Button onClick={handleClick} />

    );
}