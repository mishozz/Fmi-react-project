import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import booksService from '../../services/booksService';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    const updateSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            redirectToBook(event);
        }
    }

    const redirectToBook = async (event) => {

        try {
            const book = await booksService.fetchBooksByTitle(searchInput);
            navigate(`book/${book.isbn}`)
        } catch (e) {
            if(e.response.status === 404) {
                navigate(`book/${searchInput}`)
            }
            console.log(e)
        }
        setSearchInput("");
        event.target.value=""
    }

    return (
        <>
        <IconButton onClick={redirectToBook} size="medium" aria-label="search" color="inherit">
            <SearchIcon />
        </IconButton >
        <Search>
            <StyledInputBase
                value={searchInput}
                onInput={updateSearchInput}
                onKeyDown={handleKeyDown}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        </>
    )
}

export default SearchBar;
