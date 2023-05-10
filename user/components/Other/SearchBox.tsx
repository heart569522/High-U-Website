import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, InputBase, List, ListItem, ListItemAvatar, ListItemText, Typography, alpha, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

interface Wig {
    _id: string
    title: string
    main_image: string
    price: number
    color: string
}

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
    [theme.breakpoints.up('xs')]: {
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
        [theme.breakpoints.down('sm')]: {
            width: '25ch',
            '&:focus': {
                width: '30ch',
            },
        },
        [theme.breakpoints.up('xs')]: {
            width: '10ch',
            '&:focus': {
                width: '15ch',
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
            fetch(`${process.env.API_URL}/api/wig_data/searchWigs?q=${searchText}`)
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
            <List className="preview-results bg-[#303030d5] rounded-md absolute pt-4 items-center">
                {previewResults.map((item, i) => (
                    <Link key={i} target='_blank' href={`./Wig/[id]`} as={`./Wig/${item._id}`}>
                        <ListItem alignItems="flex-start" className="flex gap-1 py-1 px-2 hover:bg-[#303030cb]">
                            <ListItemAvatar>
                                <Image
                                    alt='preview'
                                    src={item.main_image}
                                    width={32}
                                    height={32}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                                secondary={
                                    <Typography
                                        className="text-sm"
                                        sx={{ display: 'inline' }}
                                        component="span"
                                    >
                                        {item.color} — {item.price.toLocaleString()} ฿
                                    </Typography>
                                }
                            />
                        </ListItem >
                        <Divider variant="inset" component="li" />
                    </Link>
                ))}
            </List>
        </Box >
    )
}
