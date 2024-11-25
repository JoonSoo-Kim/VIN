import React, { useState } from 'react';
import { Box, TextField, Slider, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';

const ETFSearch = ({ onSearchTermChange, onPriceRangeChange, onSearch, onCountryChange }) => {
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [priceRange, setPriceRange] = useState([0, 1000000]); // 가격 범위 상태
    const [countries, setCountries] = useState({ KOREA: true, USA: true }); // 국가 체크박스 상태

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
        onPriceRangeChange(newValue); // 가격 범위 변경 알리기
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        onSearchTermChange(event.target.value); // 검색어 변경 알리기
    };

    const handleCountryChange = (event) => {
        const { name, checked } = event.target;
        setCountries((prev) => ({ ...prev, [name]: checked }));
        onCountryChange({ ...countries, [name]: checked }); // 국가 변경 알리기
    };

    const handleSearchClick = () => {
        onSearch(); // 검색 버튼 클릭 시 검색 실행
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                border: '2px solid #009688',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9',
                width: '80%',
                height: '300px',
                margin: '0 auto',
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                ETF 검색하기
            </Typography>

            <TextField
                label="검색어"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchTermChange}
                sx={{ marginBottom: 2, height: 50 }}
                InputProps={{
                    sx: { height: '100%' },
                }}
            />

            <Typography gutterBottom>
                ETF 가격 범위 {priceRange[0]} ~ {priceRange[1]}
            </Typography>
            <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000000}
                step={1000}
                sx={{ marginBottom: 2 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <FormControlLabel
                    control={<Checkbox checked={countries.KOREA} onChange={handleCountryChange} name="KOREA" />}
                    label="한국"
                />
                <FormControlLabel
                    control={<Checkbox checked={countries.USA} onChange={handleCountryChange} name="USA" />}
                    label="미국"
                />
            </Box>

            <Button variant="contained" color="primary" onClick={handleSearchClick}>
                검색
            </Button>
        </Box>
    );
};

export default ETFSearch;
