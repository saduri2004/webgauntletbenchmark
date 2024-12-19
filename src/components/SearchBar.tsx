import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search products..."
      value={searchQuery}
      onChange={handleSearchChange}
      sx={{
        maxWidth: '500px',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
          borderRadius: '25px',
          '&:hover fieldset': {
            borderColor: '#FF6B6B',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FF6B6B',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
