import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, InputBase, List, ListItem, ListItemAvatar, ListItemText, Typography, alpha, styled } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react'

interface Wig {
    _id: string
    title: string
    main_image: string
    price: number
    color: string
}

const API_URL = "http://localhost:3000"

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

export default function SearchBox() {
    const [searchText, setSearchText] = useState('');
    const [previewResults, setPreviewResults] = useState<Wig[]>([]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;
        setSearchText(searchText);
        if (searchText.trim() !== '') {
            fetch(`${API_URL}/api/wig_data/searchWigs?q=${searchText}`)
                .then(response => response.json())
                .then(data => setPreviewResults(data.results))
                .catch(error => console.log(error));
        } else {
            setPreviewResults([]);
        }
    };

    return (
        <Box>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon sx={{ color: '#F0CA83', }} />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchText}
                    onChange={handleSearchInputChange}
                    sx={{
                        color: '#F0CA83',
                        fontFamily: 'Prompt, sans-serif',
                    }}
                />
            </Search>
            <List className="preview-results bg-[#303030d5] rounded-md absolute pt-4 pb-2 items-center">
                {previewResults.map((result, i) => (
                    <Box key={i}>
                        <ListItem alignItems="flex-start" className="flex gap-1 py-1 px-2">
                            <ListItemAvatar>
                                <Image
                                    alt='preview'
                                    src={result.main_image}
                                    width={32}
                                    height={32}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={result.title}
                                secondary={
                                    <Typography
                                        className="text-sm"
                                        sx={{ display: 'inline' }}
                                        component="span"
                                    >
                                        {result.color} — {result.price.toLocaleString()} ฿
                                    </Typography>
                                }
                            />
                        </ListItem >
                        <Divider variant="inset" component="li" />
                    </Box>
                ))}
            </List>
        </Box >
    )
}
