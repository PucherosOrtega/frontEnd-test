import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

// A custom theme for this app
export const theme = createTheme({
    components:{
    },
    typography:{
      fontFamily: 'Inter'
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#1D70ED',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
      success:{
        main: '#32D74B'
      },
      warning: {
        main: '#FFD60A'
      },
      text: {
        secondary: '#536878',
        primary: '#181E22'
      },
      background: {
        paper: '#F5F9FB',
        default: '#fff'
      },
      action:{
        selected: '#D6E5FC'
      },
  
      
    },
  });
  
  