import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionTitle } from './QuestionTitle';

describe('QuestionTitle', () => {
  const title = 'Question Title';
  const required = true;
  const helperText = 'This is a helper text';

  it('should render the question title', () => {
    render(<QuestionTitle title={title} required={required} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the required indicator', () => {
    render(<QuestionTitle title={title} required={required} />);

    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
  });

  it('should render the helper text and show tooltip on hover', async () => {
    render(
      <QuestionTitle
        title={title}
        required={required}
        helperText={helperText}
      />
    );

    const helperIcon = screen.getByLabelText('Helper');
    userEvent.hover(helperIcon);

    await waitFor(() => {
      const tooltip = screen.getByText(helperText);
      expect(tooltip).toBeInTheDocument();
    });
  });
});
