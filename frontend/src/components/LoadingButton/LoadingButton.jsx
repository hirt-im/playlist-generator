import './LoadingButton.css';
import { Button } from '@chakra-ui/react';

export default function LoadingButton(){
    return (
        <Button className='loading' size='lg' colorScheme="telegram" isDisabled={true}>
            Generating
        </Button>
      );
};
