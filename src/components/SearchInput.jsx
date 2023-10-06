import React from 'react'
import * as assets from '../assets';
import SearchDropdown from './SearchDropdown';
import citiesData from '../constants/cities.json'
import { useState } from 'react';

const SearchInput = ({ search, onSearchInputChange, isDropdownVisible, dropdownRef, handleSelect, onOutsideClick, setDropdownVisible}) => {
  const [matchingCities, setMatchingCities] = useState([]); 

  const onSearch = () => {
    const filteredCities = citiesData.filter((city) =>
      city.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setMatchingCities(filteredCities);
    setDropdownVisible(true);
  };

  return (
    <div className="flex relative w-fit">
      <input type="text" className='cityInput' value={search} onChange={(e) => onSearchInputChange(e.target.value)}   onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSearch();
        }
      }}
    placeholder='Search a city'/>
      <button onClick={onSearch} className="search-icon" disabled={!search}>
          <img src={assets.search} alt="search" />
      </button>
      <SearchDropdown
        isDropdownVisible={isDropdownVisible}
        dropdownRef={dropdownRef}
        matchingCities={matchingCities}
        handleSelect={handleSelect}
        onOutsideClick={onOutsideClick}
      />
    </div>
  )
}

export default SearchInput