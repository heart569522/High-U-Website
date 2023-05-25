import * as React from 'react';
import { useRouter } from 'next/router'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Link,
  Menu,
  MenuItem
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import Face3Icon from '@mui/icons-material/Face3';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuIcon from '@mui/icons-material/Menu';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Prompt, sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: "#F0CA83",
    },
    secondary: {
      main: "#303030"
    }
  },
});

const drawerWidth = 240;

interface Admin {
  _id: string;
  image: string;
  role: string;
}

export default function DrawerBar() {
  const { data: session } = useSession();
  const [adminData, setAdminData] = useState<Admin | null>(null);
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get(`${process.env.API_URL}/api/admin/getAdminData`);
        setAdminData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminData();
  }, []);

  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const manager_role = adminData?.role === "Manager"

  let adminMenuItem;
  if (manager_role) {
    adminMenuItem = (
      <ListItem key="Admin Manage" className="py-3">
        <ListItemButton className="rounded-lg text-[#303030] hover:bg-[#ebb859] hover:text-white" onClick={() => handleMenuItemClick('../AdminManage')}>
          <AssignmentIndIcon className="mr-3" />
          <ListItemText primary="Admin Manage" />
        </ListItemButton>
      </ListItem>
    );
  }

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h5"
          className="items-center justify-center"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 600,
            letterSpacing: '.2rem',
            color: '#F0CA83',
            textDecoration: 'none',
          }}
        >
          HIGH - U
        </Typography>
      </Toolbar>
      {/* <Divider /> */}
      <List>
        <ListItem key="Dashboard" className="py-3">
          <ListItemButton className="rounded-lg text-[#303030] hover:bg-[#ebb859] hover:text-white" onClick={() => handleMenuItemClick('../Dashboard')}>
            <DashboardIcon className="mr-3" />
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Wigs Manage" className="py-3">
          <ListItemButton className="rounded-lg text-[#303030] hover:bg-[#ebb859] hover:text-white" onClick={() => handleMenuItemClick('../WigManage')}>
            <Face3Icon className="mr-3" />
            <ListItemText primary="Wigs Manage" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Member Manage" className="py-3">
          <ListItemButton className="rounded-lg text-[#303030] hover:bg-[#ebb859] hover:text-white" onClick={() => handleMenuItemClick('../MemberManage')}>
            <GroupsIcon className="mr-3" />
            <ListItemText primary="Member Manage" />
          </ListItemButton>
        </ListItem>
        {adminMenuItem}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
          }}
        >
          <Toolbar className="bg-white flex justify-between">
            <Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 0, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Image
                  className="rounded-full object-cover w-10 h-10 transition hover:border-2 hover:transition focus:border-2"
                  alt="admin_profile"
                  width={100}
                  height={100}
                  src={adminData?.image || session?.user?.image || ''}
                  priority
                />
              </IconButton>
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link onClick={() => handleMenuItemClick('./Profile')} underline="none" >
                    <Typography sx={{ fontFamily: 'Prompt, sans-serif', color: "black" }} textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
                <Link onClick={() => signOut()} underline="none">
                  <MenuItem>
                    <Typography sx={{ fontFamily: 'Prompt, sans-serif', color: "black" }} textAlign="center">SignOut</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          {/* Responsive */}
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
          {/* Desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}