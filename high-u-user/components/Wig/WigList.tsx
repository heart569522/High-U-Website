import * as React from 'react';
import {
    Paper, Box, Grid, Container, InputLabel,
    MenuItem, FormControl, Checkbox, FormGroup,
    FormControlLabel, Card

} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider, } from '@mui/material/styles';

import WigList_Item from './WigList_Item';
import Wig_Product from '../../helper/Wig_Product.json';

function WigList() {
    const theme = createTheme({
        palette: {
            warning: {
                main: "#F0CA83",
            },
        },
        typography: {
            fontFamily: [
                'Prompt, sans-serif'
            ].join(','),
        },

    });

    const [menu1, setMenu1] = React.useState('');
    const [menu2, setMenu2] = React.useState('');

    const handleChange_Menu1 = (event: SelectChangeEvent) => {
        setMenu1(event.target.value as string);
    };
    const handleChange_Menu2 = (event: SelectChangeEvent) => {
        setMenu2(event.target.value as string);
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ backgroundColor: '#faf7f7', }}>
                <Container maxWidth="xl" >
                    {/* SELECT INPUT */}
                    <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ padding: 5, }}>
                        <Grid item xs={12} sm={3.5}>
                            <Box sx={{ minWidth: 100 }}>
                                <FormControl fullWidth >
                                    <InputLabel color='warning' id="demo-simple-select-label">First Menu</InputLabel>
                                    <Select
                                        color='warning'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={menu1}
                                        label="First Menu"
                                        onChange={handleChange_Menu1}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>Menu 1</MenuItem>
                                        <MenuItem value={2}>Menu 2</MenuItem>
                                        <MenuItem value={3}>Menu 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3.5}>
                            <Box sx={{ minWidth: 100 }}>
                                <FormControl fullWidth >
                                    <InputLabel color='warning' id="demo-simple-select-label">Second Menu</InputLabel>
                                    <Select
                                        color='warning'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={menu2}
                                        label="Second Menu"
                                        onChange={handleChange_Menu2}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>Menu 1</MenuItem>
                                        <MenuItem value={2}>Menu 2</MenuItem>
                                        <MenuItem value={3}>Menu 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        {/* CHECKBOX */}
                        <Grid item xs={12} sm={5}>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox color='warning' />} label="Check1" />
                                <FormControlLabel control={<Checkbox color='warning' />} label="Check2" />
                                <FormControlLabel control={<Checkbox color='warning' />} label="Check3" />
                                <FormControlLabel control={<Checkbox color='warning' />} label="Check4" />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    {/* WIG PRODUCT */}
                    <Box>
                        <Grid container spacing={3} sx={{ padding: 3, }} display="flow">
                            {
                                Wig_Product.map((item, i) => <WigList_Item key={item.id} item={item} />)
                            }
                        </Grid>
                    </Box>
                    
                </Container>
            </Paper>
        </ThemeProvider>
    )
}

export default WigList