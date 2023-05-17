import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxQuestion } from './CheckboxQuestion';

describe('CheckboxQuestion', () => {
  const title = <h3>Question Title</h3>;
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with the provided title', () => {
    const { getByText } = render(
      <CheckboxQuestion title={title} onAnswer={mockOnAnswer} />
    );
    expect(getByText('Question Title')).toBeInTheDocument();
  });

  it('should render the checkbox question with options', () => {
    const { getAllByRole, getByLabelText } = render(
      <CheckboxQuestion
        title={title}
        options={options}
        currentValue={[]}
        onAnswer={mockOnAnswer}
      />
    );

    const checkboxInputs = getAllByRole('checkbox');
    expect(checkboxInputs).toHaveLength(options.length);

    options.forEach((option, index) => {
      const checkboxLabel = getByLabelText(option);
      expect(checkboxLabel).toBeInTheDocument();
      expect(checkboxInputs[index]).not.toBeChecked();
    });
  });

  it('should update the selected options when checkboxes are clicked', () => {
    const currentValue = ['Option 2'];
    const { getByLabelText } = render(
      <CheckboxQuestion
        title={title}
        options={options}
        currentValue={currentValue}
        onAnswer={mockOnAnswer}
      />
    );

    userEvent.click(getByLabelText(options[0]));
    fireEvent.change(getByLabelText(options[0]), { target: { checked: true } });
    expect(getByLabelText(options[0])).toBeChecked();

    userEvent.click(getByLabelText(options[1]));
    fireEvent.change(getByLabelText(options[1]), { target: { checked: true } });
    expect(getByLabelText(options[1])).toBeChecked();

    userEvent.click(getByLabelText(options[0]));
    fireEvent.change(getByLabelText(options[0]), {
      target: { checked: false },
    });
    expect(getByLabelText(options[0])).not.toBeChecked();
  });
});
