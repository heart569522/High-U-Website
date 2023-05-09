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
import { useSession, signOut } from "next-auth/react"

// Import Components
import NavbarLikeProfile from './NavbarLikeProfile';
import NavbarSignInUpButton from './NavbarSignInUpButton';
import { Avatar, Button, Divider, Drawer, Hidden, List, ListItem, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import Image from 'next/image';
import SearchBox from '../Other/SearchBox';

// Create Theme
const theme = createTheme({
  typography: {
    fontFamily: [
      'Prompt, sans-serif'
    ].join(','),
  },
});

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
  const { data: session, status } = useSession();

  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


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
      <Divider className="bg-[#f0ca83]" />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleMenuItemClick('/')}>
            <ListItemText primary="Home" className="text-[#f0ca83]" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleMenuItemClick('/Wig')}>
            <ListItemText primary="Wig" className="text-[#f0ca83]" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleMenuItemClick('/TryAR')}>
            <ListItemText primary="TryAR" className="text-[#f0ca83]" />
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
                    Home
                  </Box>
                </Link>
                <Link onClick={() => handleMenuItemClick('/Wig')} className="cursor-pointer" underline='none'>
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
                    Wig
                  </Box>
                </Link>
                <Link onClick={() => handleMenuItemClick('/TryAR')} className="cursor-pointer" underline='none'>
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
                    Try AR
                  </Box>
                </Link>
              </Box>

              <Box className="flex absolute right-0 items-center">
                {/* SEARCH MENU */}
                <SearchBox />
                {session?.user?
                  <>
                    <Box sx={{ paddingLeft: 1 }}>
                      <Tooltip title="Favorites">
                        <IconButton onClick={() => handleMenuItemClick('/Favorite')} size="large" aria-label="" sx={{ color: '#F0CA83', }}>
                          <FavoriteTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box className="flex items-center justify-end ml-3">
                      <Tooltip title="Profile">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Image
                            className="rounded-full object-cover w-10 h-10 transition hover:border-2 hover:transition focus:border-2"
                            alt={session.user.name || ''}
                            width={100}
                            height={100}
                            src={session.user.image || ''}
                            priority
                          />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: '45px', }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <Link onClick={() => handleMenuItemClick('/Profile')} underline="none" >
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Typography sx={{ fontFamily: 'Prompt, sans-serif', color: "black" }} textAlign="center">Profile</Typography>
                          </MenuItem>
                        </Link>
                        <Divider />
                        <Link onClick={() => signOut()} underline="none" >
                          <MenuItem >
                            <Typography sx={{ fontFamily: 'Prompt, sans-serif', color: "black" }} textAlign="center">Sign Out</Typography>
                          </MenuItem>
                        </Link>
                      </Menu>
                    </Box>
                  </>

                  :
                  <NavbarSignInUpButton />
                }


              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </ThemeProvider>
  );
}

