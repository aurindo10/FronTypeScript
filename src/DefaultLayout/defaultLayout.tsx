import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { solTheme } from './style';
import InventoryIcon from '@mui/icons-material/Inventory';
import img from '../components/Bar/register/sol.svg'
import { ImgContainer } from './style';
import { Barcode, ShoppingBag } from 'phosphor-react';
import { ContacaoContext } from '../pages/Cotacoes/CotacaoContext';
import { Button } from '@mui/material';
import useLogout from '../hooks/useLogout';


const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export  function DefaultLayout() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
      await logout();
      navigate('/login');
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <ThemeProvider theme={solTheme} >
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Cadastro de Produtos
          </Typography>
          <Button sx={{color:'white', marginLeft: "90rem"}}
            onClick={()=>{signOut()}}
          >Sair</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <ImgContainer src={img}></ImgContainer>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <NavLink to ="/cadastro"  style={{ textDecoration: 'none', color:'black' }}>
              <ListItem key="Cadastro" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InventoryIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Cadastro" />
                </ListItemButton>
              </ListItem>
              </NavLink>
              <NavLink to ="/cotacoes"  style={{ textDecoration: 'none', color:'black' }}>
              <ListItem key="Cotações" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Barcode size={28} />
                  </ListItemIcon>
                  <ListItemText primary="Cotações" />
                </ListItemButton>
              </ListItem>
              </NavLink>
              <NavLink to ="/buylist"  style={{ textDecoration: 'none', color:'black' }}>
              <ListItem key="Cotações" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingBag size={28} />
                  </ListItemIcon>
                  <ListItemText primary="Lista de Compras" />
                </ListItemButton>
              </ListItem>
              </NavLink>
        </List>
        <Divider />
        <List>
          {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
         <Outlet></Outlet>
        
      </Main>
    </Box>
  </ThemeProvider>
  );
}
