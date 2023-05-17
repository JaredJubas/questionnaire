import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionnaireSubmit } from './QuestionnaireSubmit';

describe('QuestionnaireSubmit', () => {
  const answers = {
    question1: {
      question: 'Question 1',
      answer: 'Answer 1',
    },
    question2: {
      question: 'Question 2',
      answer: ['Answer 2', 'Answer 3'],
    },
  };
  const mockOnBackButtonClick = jest.fn();
  const mockOnSubmitButtonClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <QuestionnaireSubmit
        answers={answers}
        onBackButtonClick={mockOnBackButtonClick}
        onSubmitButtonClick={mockOnSubmitButtonClick}
      />
    );
  });

  it('displays the correct question and answers', () => {
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
    expect(screen.getByText('Answer 2, Answer 3')).toBeInTheDocument();
  });

  it('calls the onBackButtonClick callback when the "Back" button is clicked', () => {
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);
    expect(mockOnBackButtonClick).toHaveBeenCalled();
  });

  it('calls the onSubmitButtonClick callback when the "Submit" button is clicked', () => {
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    expect(mockOnSubmitButtonClick).toHaveBeenCalled();
  });
});
