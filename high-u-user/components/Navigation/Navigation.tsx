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

function Navbar() {
  const router = useRouter()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path)
  }

  return (
    <ThemeProvider theme={theme}>
      <HideOnScroll>
        <AppBar position="sticky" sx={{ backgroundColor: '#303030' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters >
              {/* LOGO */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                className="cursor-pointer"
                onClick={() => handleMenuItemClick('/')}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
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
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  sx={{
                    color: '#F0CA83',
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none', },
                  }}
                >
                  <Link onClick={() => handleMenuItemClick('/')} underline="none">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        color={'black'}
                      >
                        หน้าแรก
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link onClick={() => handleMenuItemClick('/user/Wig')} underline="none">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        color={'black'}
                      >
                        วิก
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link onClick={() => handleMenuItemClick('/user/TryAR')} underline="none">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        color={'black'}
                      >
                        ทดลอง AR
                      </Typography>
                    </MenuItem>
                  </Link>
                </Menu>
              </Box>

              <Typography
                variant="h5"
                noWrap
                component="a"
                onClick={() => handleMenuItemClick('/')}
                className="max-sm:text-sm cursor-pointer"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
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

              {/* MENU */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, fontFamily: 'Prompt, sans-serif', }}>
                {/* {pages.map((page) => ( */}
                <Link onClick={() => handleMenuItemClick('/')} className="cursor-pointer" underline='none'>
                  <Box
                    onClick={handleCloseNavMenu}
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
                    onClick={handleCloseNavMenu}
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
                    onClick={handleCloseNavMenu}
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
                {/* <Link href="/test" underline="none"
                  onClick={handleCloseNavMenu}
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
                  Test Page
                </Link> */}
                {/* ))} */}
              </Box>

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

            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </ThemeProvider>
  );
}
export default Navbar;
