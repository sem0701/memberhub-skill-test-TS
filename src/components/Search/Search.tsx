import React from 'react';
import axios from 'axios';
import { Cause, CausesResponse } from 'types/cause';

type Props = {
  causes: Cause[] | [];
  setCauses: React.Dispatch<React.SetStateAction<Cause[] | []>>;
  causesLeft: boolean;
  setCausesLeft: React.Dispatch<React.SetStateAction<boolean>>;
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  searchCity: string;
  setSearchCity: React.Dispatch<React.SetStateAction<string>>;
  searchState: string;
  setSearchState: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({
  causes,
  setCauses,
  causesLeft,
  setCausesLeft,
  searchName,
  setSearchName,
  searchCity,
  setSearchCity,
  searchState,
  setSearchState
}: Props) => {
  const search = async () => {
    const baseURL = 'https://api.givebacks.com/services/core/causes/search?';
    let nameURL = '';
    let cityURL = '';
    let stateURL = '';
    let count = 0;

    if (searchName) {
      nameURL = `search[name][value]=${searchName}`;
      count++;
    }
    if (searchCity) {
      cityURL = `search[city][value]=${searchCity}`;
      count++;
    }
    if (searchState) {
      stateURL = `search[state][value]=${searchState}`;
      count++;
    }

    if (count < 2) {
      const { data } = await axios.get<CausesResponse>(
        `${baseURL}${nameURL}${cityURL}${stateURL}`
      );
      setCauses(data.causes);

      if (data.meta.has_more) {
        setCausesLeft(true);
      } else {
        setCausesLeft(false);
      }
    } else {
      const { data } = await axios.get<CausesResponse>(
        `${baseURL}join=AND&${nameURL}&${cityURL}&${stateURL}`
      );
      setCauses(data.causes);

      if (data.meta.has_more) {
        setCausesLeft(true);
      } else {
        setCausesLeft(false);
      }
    }
  };

  const handleSearch = async () => {
    await search();
  };

  const handleKeyPress:
    | React.KeyboardEventHandler<HTMLInputElement>
    | undefined = async (event) => {
    if (event.key === 'Enter') {
      await search();
    }
  };

  return (
    <div className="search flex items-center bg-gray-50 border border-gray-300 rounded-lg divide-x">
      <div className="search-name">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Cause Name"
          className="rounded-l-lg bg-gray-50 text-gray-900 text-sm  focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 "
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="search-city">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="City"
          className="bg-gray-50 text-gray-900 text-sm  focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5"
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="search-state">
        <input
          type="text"
          value={searchState}
          onChange={(e) => setSearchState(e.target.value)}
          placeholder="State"
          className=" bg-gray-50 text-gray-900 text-sm  focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 "
          onKeyDown={handleKeyPress}
        />
      </div>
      <button
        onClick={async () => {
          await handleSearch();
        }}
        className=" mx-2 h-8 w-16 text-orange-400 hover:text-white !border border-orange-400 hover:bg-orange-500 focus:ring-2 focus:outline-none focus:ring-orange-300  rounded-lg text-xs text-center "
      >
        Search
      </button>
    </div>
  );
};

export default Search;
