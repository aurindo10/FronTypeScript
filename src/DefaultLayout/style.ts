import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, grey} from '@mui/material/colors';
import styled from 'styled-components';

export const solTheme = createTheme({
  palette: {
    primary: {
      main: grey[900], 

    },
    secondary: {
    
      main: amber[900],
      
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