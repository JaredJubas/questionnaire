import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberQuestion } from './NumberQuestion';

describe('NumberQuestion', () => {
  const title = <h3>Question Title</h3>;
  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with the provided title', () => {
    const { getByText } = render(
      <NumberQuestion title={title} onAnswer={mockOnAnswer} />
    );
    expect(getByText('Question Title')).toBeInTheDocument();
  });

  it('should call the onAnswer function with the input value when it changes', () => {
    const { getByRole } = render(
      <NumberQuestion title={title} onAnswer={mockOnAnswer} />
    );

    const inputElement = getByRole('spinbutton');
    userEvent.type(inputElement, '1998');

    expect(mockOnAnswer).toHaveBeenCalledWith('1998');
  });

  it('should set the initial input value based on the currentValue prop', () => {
    const currentValue = ['2000'];
    const { getByRole } = render(
      <NumberQuestion
        title={title}
        onAnswer={mockOnAnswer}
        currentValue={currentValue}
      />
    );

    const inputElement = getByRole('spinbutton');
    expect(inputElement).toHaveValue(2000);
  });

  it('should update the input value when the currentValue prop changes', () => {
    const currentValue = ['2000'];
    const { getByRole } = render(
      <NumberQuestion
        title={title}
        onAnswer={mockOnAnswer}
        currentValue={currentValue}
      />
    );
    const inputElement = getByRole('spinbutton');

    expect(inputElement).toHaveValue(2000);

    fireEvent.change(inputElement, { target: { value: '20' } });
    expect(inputElement).toHaveValue(20);
  });
});
