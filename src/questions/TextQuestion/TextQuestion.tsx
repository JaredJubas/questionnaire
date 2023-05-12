import React from 'react';
import { TextField } from '@mui/material';

interface TextQuestionProps {
  title: string;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({ title }) => {
  return (
    <div>
      <p>{title}</p>
      <TextField variant="outlined" />
    </div>
  );
};
