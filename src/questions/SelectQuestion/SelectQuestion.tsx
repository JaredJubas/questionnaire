import React, { useState } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface SelectQuestionProps {
  title: string;
  options: string[];
}

export const SelectQuestion: React.FC<SelectQuestionProps> = ({
  title,
  options,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <p>{title}</p>
      <Select value={value} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
