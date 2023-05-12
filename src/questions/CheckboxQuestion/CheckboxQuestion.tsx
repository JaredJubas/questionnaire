import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface CheckboxQuestionProps {
  title: string;
  options: string[];
}

export const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  title,
  options,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(value)) {
        return prevSelectedOptions.filter((option) => option !== value);
      } else {
        return [...prevSelectedOptions, value];
      }
    });
  };

  return (
    <div>
      <p>{title}</p>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={selectedOptions.includes(option)}
              onChange={handleCheckboxChange}
              value={option}
            />
          }
          label={option}
        />
      ))}
    </div>
  );
};
