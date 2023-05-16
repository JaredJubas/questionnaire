import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { TextQuestion } from './TextQuestion';

describe('TextQuestion', () => {
  const title = <h3>Question Title</h3>;
  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with the provided title', () => {
    const { getByText } = render(
      <TextQuestion title={title} onAnswer={mockOnAnswer} />
    );
    expect(getByText('Question Title')).toBeInTheDocument();
  });

  it('should call the onAnswer function with the input value when it changes', () => {
    const { getByRole } = render(
      <TextQuestion title={title} onAnswer={mockOnAnswer} />
    );

    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Answer' } });

    expect(mockOnAnswer).toHaveBeenCalledWith('Answer');
  });

  it('should set the initial input value based on the currentValue prop', () => {
    const initialValue = ['Initial Value'];
    const { getByRole } = render(
      <TextQuestion
        title={title}
        onAnswer={mockOnAnswer}
        currentValue={initialValue}
      />
    );

    const inputElement = getByRole('textbox');
    expect(inputElement).toHaveValue(initialValue[0]);
  });

  it('should update the input value when the currentValue prop changes', () => {
    const initialValue = ['Initial Value'];
    const { getByRole } = render(
      <TextQuestion
        title={title}
        onAnswer={mockOnAnswer}
        currentValue={initialValue}
      />
    );
    const inputElement = getByRole('textbox');

    expect(inputElement).toHaveValue(initialValue[0]);

    const newValue = 'New Value';

    fireEvent.change(inputElement, { target: { value: newValue } });
    expect(inputElement).toHaveValue(newValue);
  });
});
