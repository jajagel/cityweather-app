import React from 'react'
import { useEffect } from 'react';

const SearchDropdown = ({ isDropdownVisible, dropdownRef, matchingCities, handleSelect, onOutsideClick,
  }) => {
     const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, onOutsideClick]);
  return (
    <div> 
      {isDropdownVisible && (
        <div  ref={dropdownRef} className="dropdown">
            {matchingCities.length === 0 ? (
                <p>No matching cities found</p>
            ) : (
            <ul>
                {matchingCities.map((city, index) => (
                <li className="dropdown-row" onClick={()=>handleSelect(city)}key={index}>
                    {city.name}
                </li>
                ))}
            </ul>
            )}
        </div>
      )}
    </div>
  )
}

export default SearchDropdown