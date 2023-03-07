import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import router from 'next/router';

import DashboardIcon from '@mui/icons-material/Dashboard';
import Face3Icon from '@mui/icons-material/Face3';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';


export default function Bottom_NavAdmin() {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    }, [value]);


    const handleMenuItemClick = (path: string) => {
        router.push(path)
    }

    return (
        <Box ref={ref}>
            <Paper className="block" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={4}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} onClick={() => handleMenuItemClick('/admin/Dashboard')} />
                    <BottomNavigationAction label="Wigs Manage" icon={<Face3Icon />} onClick={() => handleMenuItemClick('/admin/WigManage')} />
                    <BottomNavigationAction label="AR Manage" icon={<AspectRatioIcon />} onClick={() => handleMenuItemClick('/admin/ARManage')} />
                    <BottomNavigationAction label="Member List" icon={<GroupsIcon />} onClick={() => handleMenuItemClick('/admin/MemberList')} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}