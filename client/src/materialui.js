import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={6} direction="row">
      <Button variant="contained">Control Robot</Button>
      <Button variant="contained">Pair Robot</Button>
    </Stack>
  );
}