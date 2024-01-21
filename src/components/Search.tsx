import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchInitialSearchList } from '../services/api/search.services';
import { Station } from '../domain';
import Stack from '@mui/material/Stack';
import SearchResult from './SearchResult';

const Search = () => {
  const [searchList, setSearchList] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInitialSearchList();
        setSearchList(data.features);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStationSelect = (
    event: React.ChangeEvent<object>,
    value: Station | null
  ) => {
    setSelectedStation(value);
  };

  const isOptionEqualToValue = (
    option: Station,
    value: Station | null
  ): boolean => {
    if (value) {
      return option.properties.stationId === value.properties.stationId;
    }
    return false;
  };

  return (
    <Stack>
      <Autocomplete
        fullWidth
        disablePortal
        id="combo-box-demo"
        options={searchList}
        getOptionLabel={(option) => option.properties.name}
        onChange={handleStationSelect}
        value={selectedStation}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => <TextField {...params} label="Stations" />}
      />
      <SearchResult selectedStation={selectedStation} />
    </Stack>
  );
};

export default Search;
