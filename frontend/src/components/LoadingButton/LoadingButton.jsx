import './LoadingButton.css';
import React, { useState, useEffect } from 'react';
import { Button, Box } from '@chakra-ui/react';

export default function LoadingButton(){
    return (
        <Button className='loading' size='lg' colorScheme="telegram" isDisabled={true}>
            Generating
        </Button>
      );
};





