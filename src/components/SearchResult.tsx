import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import StationMap from './Map';
import { Station } from '../domain';
import { useState } from 'react';

interface SearchResultProps {
  selectedStation: Station | null;
  onStationClick: (coordinates: [number, number]) => void;
}

const SearchResult = ({
  selectedStation,
}: SearchResultProps) => {
  const [clickedCoordinates, setClickedCoordinates] = useState<[number, number] | null>(null);

  const handleStationClick = () => {
    if (selectedStation) {
      const coordinates = selectedStation.geometry.coordinates;
      setClickedCoordinates(coordinates);
    }
  };

  return (
    <Grid container spacing={2} sx={{ margin: '3%' }}>
      <Grid item xs={4} md={4}>
        <Paper
          sx={{
            backgroundColor: '#FFF',
            marginTop: '19px',
            border: '1px solid var(--neutrals-100, #EFEFF1)',
            borderRadius: '16px',
            maxHeight: 'calc(100vh - 200px)',
            width: '400px',
            overflowY: 'auto',
            padding: '24px',
            cursor: 'pointer',
          }}
          onClick={handleStationClick}
        >
          <Stack
            flexDirection="column"
            sx={{
              backgroundColor: 'white',
              borderRadius: 4,
              marginTop: 5,
            }}
          >
            {selectedStation ? (
              <>
                <h2>{selectedStation.properties.name}</h2>
                <p>Station ID: {selectedStation.properties.stationId}</p>
                <p>Date Observed: {selectedStation.properties.dateObserved}</p>
                <p>Temperature: {selectedStation.properties.temperature}</p>
                <p>
                  Relative Humidity:{' '}
                  {selectedStation.properties.relativeHumidity}
                </p>
              </>
            ) : (
              <div>No station selected.</div>
            )}
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={8} md={8}>
      <StationMap selectedStation={selectedStation} clickedCoordinates={clickedCoordinates} />
      </Grid>
    </Grid>
  );
};

export default SearchResult;
