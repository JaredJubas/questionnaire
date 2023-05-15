import React, { useState } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { QuestionComponentProps } from '../../components/Questionnaire/Questionnaire';

export const SelectQuestion: React.FC<QuestionComponentProps> = ({
  title,
  options = [],
  currentValue,
  onAnswer,
}) => {
  const [value, setValue] = useState((currentValue && currentValue[0]) ?? '');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    onAnswer(value);
  }, [value]);

  return (
    <FormControl fullWidth>
      {title}
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
