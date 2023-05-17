import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { Questionnaire } from './Questionnaire';
import userEvent from '@testing-library/user-event';
import { useMutation } from '@apollo/client';

jest.mock('axios');
jest.mock('@apollo/client');

describe('Questionnaire', () => {
  const mockSubmitQuestionnaire = jest.fn();

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
    jest.clearAllMocks();
    (useMutation as jest.Mock).mockReturnValue([mockSubmitQuestionnaire]);
    (axios.get as jest.Mock).mockResolvedValue({ data: questionsData });
  });

  test('renders the first question', async () => {
    const { findByText } = render(<Questionnaire />);
    const questionTitle = await findByText(questionsData[0].title);
    expect(questionTitle).toBeInTheDocument();
  });

  test('navigates to the next question when clicking "Next"', async () => {
    const { findByText, getByRole } = render(<Questionnaire />);
    const nextButton = await findByText('Next');
    const inputElement = getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'Test Answer' } });
    fireEvent.click(nextButton);

    const secondQuestionTitle = await findByText(questionsData[1].title);
    expect(secondQuestionTitle).toBeInTheDocument();
  });

  test('navigates to the previous question when clicking "Back"', async () => {
    const { findByText, getByRole } = render(<Questionnaire />);
    const nextButton = await findByText('Next');
    const inputElement = getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'Test Answer' } });
    fireEvent.click(nextButton);

    const backButton = await findByText('Back');

    fireEvent.click(backButton);

    const firstQuestionTitle = await findByText(questionsData[0].title);
    expect(firstQuestionTitle).toBeInTheDocument();
  });

  test('displays validation error when required question is not answered', async () => {
    const { findByText } = render(<Questionnaire />);
    const nextButton = await findByText('Next');

    fireEvent.click(nextButton);

    const validationError = await findByText('This question is required.');
    expect(validationError).toBeInTheDocument();
  });

  it('renders the QuestionnaireSubmit component when all questions have been answered', async () => {
    const { getByRole, getAllByRole, getByLabelText } = render(
      <Questionnaire />
    );

    // Check first question loaded
    const firstQuestionTitle = await screen.findByText(questionsData[0].title);
    expect(firstQuestionTitle).toBeInTheDocument();

    // Answer the first question
    const nextButton = await screen.findByText('Next');
    const textElement = getByRole('textbox');

    fireEvent.change(textElement, { target: { value: 'Test Answer' } });
    fireEvent.click(nextButton);

    // Check second question loaded
    const secondQuestionTitle = await screen.findByText(questionsData[1].title);
    expect(secondQuestionTitle).toBeInTheDocument();

    // Answer the second question
    const numberElement = getByRole('spinbutton');
    fireEvent.change(numberElement, { target: { value: '20' } });

    fireEvent.click(nextButton);

    // Check third question loaded
    const thirdQuestionTitle = await screen.findByText(questionsData[2].title);
    expect(thirdQuestionTitle).toBeInTheDocument();

    // Answer the third question
    const selectButton = getAllByRole('button')[0];
    fireEvent.mouseDown(selectButton);

    const optionElements = getAllByRole('option');

    fireEvent.click(optionElements[0], { target: { value: 'Option 1' } });

    fireEvent.click(nextButton);

    // Check fourth question loaded
    const fourthQuestionTitle = await screen.findByText(questionsData[3].title);
    expect(fourthQuestionTitle).toBeInTheDocument();

    // Answer the fourth question
    userEvent.click(getByLabelText('Option A'));
    fireEvent.change(getByLabelText('Option A'), { target: { checked: true } });

    fireEvent.click(nextButton);

    // QuestionnaireSubmit should have been rendered
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
  });
});
