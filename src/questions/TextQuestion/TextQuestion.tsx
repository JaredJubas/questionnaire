import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { QuestionComponentProps } from '../../components/Questionnaire/Questionnaire';

export const TextQuestion: React.FC<QuestionComponentProps> = ({
  title,
  onAnswer,
  currentValue,
}) => {
  const [inputValue, setInputValue] = useState(
    (currentValue && currentValue[0]) ?? ''
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  React.useEffect(() => {
    onAnswer(inputValue);
  }, [inputValue]);

  return (
    <div>
      {title}
      <TextField
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};
