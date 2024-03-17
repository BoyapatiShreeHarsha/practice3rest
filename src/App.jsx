import React, { useState } from 'react'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'
import Header from './components/Header/Header'
import Content from './components/Content/Content';
import { Box } from '@mui/material';
import Page2 from './components/Page2/Page2';
import {
  Routes,
  Route
} from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(207, 26%, 17%)',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
  },
});



function App() {

  const [data, setData] = useState({});

  return (

    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Content setData={setData} />} />
          <Route path="/country" element={<Page2 data={data} setData={setData} />} />
        </Routes>
      </Box>
    </ThemeProvider>

  )
}

export default App
