import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { SelectQuestion } from './SelectQuestion';

const options = ['Option 1', 'Option 2', 'Option 3'];

describe('SelectQuestion', () => {
  const title = <h3>Question Title</h3>;
  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with the provided title', () => {
    const { getByText } = render(
      <SelectQuestion
        title={title}
        options={options}
        currentValue={[]}
        onAnswer={mockOnAnswer}
      />
    );

    const selectQuestion = getByText('Question Title');
    expect(selectQuestion).toBeInTheDocument();
  });

  it('should render the select question with options', () => {
    const { getByRole, getAllByRole } = render(
      <SelectQuestion
        title={title}
        options={options}
        currentValue={[]}
        onAnswer={mockOnAnswer}
      />
    );

    const selectElement = getByRole('button');
    expect(selectElement).toBeInTheDocument();

    fireEvent.mouseDown(getByRole('button'));

    const optionElements = getAllByRole('option');

    expect(optionElements).toHaveLength(options.length);
    options.forEach((option, index) => {
      expect(optionElements[index]).toHaveTextContent(option);
    });
  });

  it('should call the onAnswer function with the selected option', () => {
    const { getByRole, getAllByRole } = render(
      <SelectQuestion
        title={title}
        options={options}
        currentValue={[]}
        onAnswer={mockOnAnswer}
      />
    );

    const selectElement = getByRole('button');
    expect(selectElement).toBeInTheDocument();

    fireEvent.mouseDown(selectElement);

    const optionElements = getAllByRole('option');

    fireEvent.click(optionElements[1], { target: { value: options[1] } });

    expect(mockOnAnswer).toHaveBeenCalledWith(options[1]);
  });

  it('should update the selected option when the currentValue prop changes', () => {
    const currentValue = ['Option 2'];
    const { getByRole, getAllByRole } = render(
      <SelectQuestion
        title={title}
        options={options}
        currentValue={currentValue}
        onAnswer={mockOnAnswer}
      />
    );

    const selectElement = getByRole('button');

    expect(selectElement).toHaveTextContent(currentValue[0]);

    fireEvent.mouseDown(selectElement);

    const optionElements = getAllByRole('option');

    fireEvent.click(optionElements[0], { target: { value: options[1] } });

    expect(selectElement).toHaveTextContent(options[0]);
  });
});
