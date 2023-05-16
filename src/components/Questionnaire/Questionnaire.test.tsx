import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { Questionnaire } from './Questionnaire';

jest.mock('axios');

describe('Questionnaire', () => {
  const questionsData = [
    {
      id: '1',
      title: 'Question 1',
      type: 'text',
      required: true,
    },
    {
      id: '2',
      title: 'Question 2',
      type: 'number',
      required: false,
    },
    {
      id: '3',
      title: 'Question 3',
      type: 'select',
      required: true,
      options: ['Option 1', 'Option 2', 'Option 3'],
    },
    {
      id: '4',
      title: 'Question 4',
      type: 'checkbox',
      required: false,
      options: ['Option A', 'Option B', 'Option C'],
    },
  ];

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: questionsData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the first question', async () => {
    render(<Questionnaire />);
    const questionTitle = await screen.findByText(questionsData[0].title);
    expect(questionTitle).toBeInTheDocument();
  });

  test('navigates to the next question when clicking "Next"', async () => {
    render(<Questionnaire />);
    const nextButton = await screen.findByText('Next');
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'Test Answer' } });
    fireEvent.click(nextButton);

    const secondQuestionTitle = await screen.findByText(questionsData[1].title);
    expect(secondQuestionTitle).toBeInTheDocument();
  });

  test('navigates to the previous question when clicking "Back"', async () => {
    render(<Questionnaire />);
    const nextButton = await screen.findByText('Next');
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'Test Answer' } });
    fireEvent.click(nextButton);

    const backButton = await screen.findByText('Back');

    fireEvent.click(backButton);

    const firstQuestionTitle = await screen.findByText(questionsData[0].title);
    expect(firstQuestionTitle).toBeInTheDocument();
  });

  test('displays validation error when required question is not answered', async () => {
    render(<Questionnaire />);
    const nextButton = await screen.findByText('Next');

    fireEvent.click(nextButton);

    const validationError = await screen.findByText(
      'This question is required.'
    );
    expect(validationError).toBeInTheDocument();
  });
});
