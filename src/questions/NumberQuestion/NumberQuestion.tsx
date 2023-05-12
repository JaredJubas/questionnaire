import React from 'react';
import { TextField } from '@mui/material';

interface Props {
  title: string;
}

export const NumberQuestion: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <p>{title}</p>
      <TextField type="number" variant="outlined" />
    </div>
  );
};
