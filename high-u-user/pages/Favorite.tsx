import * as React from 'react';
import {
    IconButton,
    Container,
    Typography,
    Box,
    Grid,
    Link,
    TextField,
    CssBaseline,
    Button,
    Paper
} from '@mui/material';

// IMPORT COMPONENT
import Navbar from "../components/Navigation/Navigation"
import UserHeader from '../components/Auth/UserHeader';

export default function Favorite() {
    return (
        <div>
            <Paper className="bg-[#252525] h-screen">
                <Navbar />
                <Container maxWidth="xl" >
                    <UserHeader />
                </Container>
            </Paper>

        </div>
    );
}
