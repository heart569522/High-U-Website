import React from 'react'
import { useRouter } from 'next/router'
import { Drawer, List, ListItem, ListItemText } from '@mui/material'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    //   const classes = useStyles()
    const router = useRouter()
    const [isMenuOpen, setMenuOpen] = React.useState(false)

    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen)
    }

    const handleMenuClose = () => {
        setMenuOpen(false)
    }

    const handleMenuItemClick = (path: string) => {
        router.push(path)
        handleMenuClose()
    }

    return (
        <div className="flex flex-col h-screen">
            <Drawer open={isMenuOpen} onClose={handleMenuClose}>
                <div className="w-52">
                    <List>
                        <ListItem button onClick={() => handleMenuItemClick('/Dashboard')}>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={() => handleMenuItemClick('/ManageWig')}>
                            <ListItemText primary="Wigs Manage" />
                        </ListItem>
                        <ListItem button onClick={() => handleMenuItemClick('/MemberList')}>
                            <ListItemText primary="Member List" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <div className="flex-1 overflow-y-scroll p-4">
                <button
                    className="p-2 rounded-full text-gray-800 hover:bg-gray-200"
                    onClick={handleMenuToggle}
                >
                    Toggle Menu
                </button>
                {children}
            </div>
        </div>
    )
}

export default Layout