import React, { useState } from 'react';
import SearchIcon from '../../assets/icons/search-black.svg';
import ArrowIcon from '../../assets/icons/arrow-right.svg';

const SearchBar = ({ search, setSearch, handleSearch, showSearchButton }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <form onSubmit={(e) => e.preventDefault()} className="w-full relative">
        <div className="absolute inset-y-0 left-0 top-0 flex py-3 pl-3 items-center">
          <img
            loading="lazy"
            src={SearchIcon}
            alt="search icon"
            className="md:w-7 md:h-7 w-5 h-5"
          />
        </div>
        <input
          autoFocus
          type="text"
          id="search"
          name="search"
          placeholder="Search by address/protocol/exchange name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-14 md:pl-14 md:pr-14 pl-9 pr-3 font-Montserrat font-medium md:text-h2 text-xs border-0 rounded-md shadow-search-shadow placeholder-contact-input-grey text-dark-blue focus:border-black focus:ring-0"
        />
        {!!showSearchButton && (
          <div className="absolute inset-y-0 right-0 flex py-3 pr-3">
            <button
              type="button"
              onClick={handleSearch}
              className="p-2 rounded-lg bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 flex justify-center items-center"
            >
              <img loading="lazy" src={ArrowIcon} alt="Arrow icon" className="w-4 h-4" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
