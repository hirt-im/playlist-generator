import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {theme} from './theme.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Callback from './components/Callback.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <App /> } />
          <Route path="/callback" element={ <Callback /> } />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)


