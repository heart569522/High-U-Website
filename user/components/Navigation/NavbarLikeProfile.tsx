import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { useRouter } from 'next/router'
import { Divider } from '@mui/material';

function NavbarLikeProfile() {
    const router = useRouter()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuItemClick = (path: string) => {
        router.push(path)
    }

    return (
        <Box className='flex justify-end items-center'>
            {/* LIKE MENU */}
            <Box sx={{ paddingLeft: 1 }}>
                <Tooltip title="Favorites">
                    <IconButton onClick={() => handleMenuItemClick('/user/Favorite')} size="large" aria-label="" sx={{ color: '#F0CA83', }}>
                        <FavoriteTwoToneIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* PROFILE MENU */}
            <Box className="flex items-center justify-end">
                <Tooltip title="Profile">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="" src="" />
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
                    <Link onClick={() => handleMenuItemClick('/user/Profile')} underline="none" >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography sx={{ fontFamily: 'Prompt, sans-serif', color: "black" }} textAlign="center">Profile</Typography>
                        </MenuItem>
                    </Link>
                    <Divider />
                    <Link href="#" underline="none" >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography sx={{ fontFamily: 'Prompt, sans-serif', color: "black" }} textAlign="center">Sign Out</Typography>
                        </MenuItem>
                    </Link>
                </Menu>
            </Box>
        </Box>
    )
}

export default NavbarLikeProfile;
