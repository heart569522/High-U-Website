import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { createTheme, ThemeProvider, styled, alpha } from '@mui/material/styles';
import { useRouter } from 'next/router'

// Import Components
import NavbarLikeProfile from './NavbarLikeProfile';
import NavbarSignInUpButton from './NavbarSignInUpButton';
import { Divider, Drawer, Hidden, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

// Create Theme
const theme = createTheme({
  typography: {
    fontFamily: [
      'Prompt, sans-serif'
    ].join(','),
  },
});

// Search Input
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '35%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// Scroll Navbar 
function HideOnScroll(props: { children: any; window: any; }) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const drawerWidth = 240;

export default function Navbar() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} className="bg-[#303030] h-screen">
      <Typography
        variant="h6"
        className="cursor-pointer py-4"
        // onClick={() => handleMenuItemClick('/')}
        sx={{
          // my: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: '#F0CA83',
          textDecoration: 'none',
        }}
      >
        HIGH-U
      </Typography>
      <Divider className="bg-[#f0ca83]"/>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleMenuItemClick('/')}>
            <ListItemText primary="Home" className="text-[#f0ca83]"/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleMenuItemClick('/user/Wig')}>
            <ListItemText primary="Wig" className="text-[#f0ca83]"/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleMenuItemClick('/user/Wig')}>
            <ListItemText primary="TryAR" className="text-[#f0ca83]"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <HideOnScroll>
        <AppBar position="sticky" component="nav" sx={{ backgroundColor: '#303030' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters >
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#F0CA83', mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              {/* LOGO */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                className="cursor-pointer"
                onClick={() => handleMenuItemClick('/')}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'block' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#F0CA83',
                  textDecoration: 'none',
                }}
              >
                HIGH-U
              </Typography>

              {/* LOGO-MENU RESPONSIVE */}
              <Box component="nav">
                <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                  }}
                >
                  {drawer}
                </Drawer>
              </Box>
              <Hidden smDown>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  onClick={() => handleMenuItemClick('/')}
                  className="max-sm:text-xl cursor-pointer"
                  sx={{
                    // mr: 2,
                    display: { xs: 'block', sm: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    letterSpacing: '.3rem',
                    color: '#F0CA83',
                    textDecoration: 'none',
                  }}
                >
                  HIGH-U
                </Typography>
              </Hidden>

              {/* MENU */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, fontFamily: 'Prompt, sans-serif', }}>
                {/* {pages.map((page) => ( */}
                <Link onClick={() => handleMenuItemClick('/')} className="cursor-pointer" underline='none'>
                  <Box
                    sx={{
                      px: 2,
                      my: 2,
                      color: '#F0CA83',
                      display: 'block',
                      fontWeight: 'bold',
                      '&:hover': {
                        color: "#ffefd1",
                      },
                      transition: '.3s',
                    }}
                  >
                    หน้าแรก
                  </Box>
                </Link>
                <Link onClick={() => handleMenuItemClick('/user/Wig')} className="cursor-pointer" underline='none'>
                  <Box
                    sx={{
                      px: 2,
                      my: 2,
                      color: '#F0CA83',
                      display: 'block',
                      fontWeight: 'bold',
                      '&:hover': {
                        color: "#ffefd1",
                      },
                      transition: '.3s',
                    }}
                  >
                    วิก
                  </Box>
                </Link>
                <Link onClick={() => handleMenuItemClick('/user/TryAR')} className="cursor-pointer" underline='none'>
                  <Box
                    sx={{
                      px: 2,
                      my: 2,
                      color: '#F0CA83',
                      display: 'block',
                      fontWeight: 'bold',
                      '&:hover': {
                        color: "#ffefd1",
                      },
                      transition: '.3s',
                    }}
                  >
                    ทดลอง AR
                  </Box>
                </Link>
              </Box>

              <Box className="flex justify-end items-center">
                {/* SEARCH MENU */}
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: '#F0CA83', }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={handleKeyPress}
                    sx={{
                      color: '#F0CA83',
                      fontFamily: 'Prompt, sans-serif',
                    }}
                  />
                </Search>
                {/* If Login OR Non-Login */}
                {/* <NavbarLikeProfile /> */}
                <NavbarSignInUpButton />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </ThemeProvider>
  );
}

