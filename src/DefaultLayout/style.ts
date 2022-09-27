import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, grey } from '@mui/material/colors';
import styled from 'styled-components';

export const solTheme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: amber[900], 

    },
    secondary: {
      // This is green.A700 as hex.
      main: grey[900],
      
    },

  },
});
export const ImgContainer = styled.img`
    width: 10rem;
    position: relative;
    text-align: center;
    align-items: center;
    margin-bottom: 1rem;
`