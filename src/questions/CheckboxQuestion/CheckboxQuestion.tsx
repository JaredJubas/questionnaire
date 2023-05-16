import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { QuestionComponentProps } from '../../components/Questionnaire/Questionnaire';

export const CheckboxQuestion: React.FC<QuestionComponentProps> = ({
  title,
  options = [],
  currentValue,
  onAnswer,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    currentValue ?? []
  );

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

  useEffect(() => {
    onAnswer(selectedOptions);
  }, [selectedOptions]);

  return (
    <div>
      {title}
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
