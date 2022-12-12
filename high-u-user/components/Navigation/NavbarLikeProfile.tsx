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

function NavbarLikeProfile() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Grid sx={{ display: 'flex' }}>
            {/* LIKE MENU */}
            <Box sx={{ flexGrow: 0, paddingLeft: 1 }}>
                <Tooltip title="Favorites">
                    <IconButton size="large" aria-label="" sx={{ color: '#F0CA83', }}>
                        <FavoriteTwoToneIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* PROFILE MENU */}
            <Box sx={{ flexGrow: 0, paddingLeft: 1, paddingTop: .5 }}>
                <Tooltip title="Profile">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Link href="#" underline="none" >
                            <Typography sx={{ fontFamily: 'Prompt, sans-serif', color: "black" }} textAlign="center">โปรไฟล์</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Link href="#" underline="none" >
                            <Typography sx={{ fontFamily: 'Prompt, sans-serif', color: "black" }} textAlign="center">ออกจากระบบ</Typography>
                        </Link>
                    </MenuItem>
                </Menu>
            </Box>
        </Grid>
    )
}

export default NavbarLikeProfile;
