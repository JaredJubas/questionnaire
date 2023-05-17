import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import axios from 'axios';
import { CheckboxQuestion } from '../../questions/CheckboxQuestion/CheckboxQuestion';
import { NumberQuestion } from '../../questions/NumberQuestion/NumberQuestion';
import { SelectQuestion } from '../../questions/SelectQuestion/SelectQuestion';
import { TextQuestion } from '../../questions/TextQuestion/TextQuestion';
import { Button, Typography, Box, Grid } from '@mui/material';
import { QuestionTitle } from '../QuestionTitle/QuestionTitle';
import { QuestionnaireSubmit } from '../QuestionnaireSubmit/QuestionnaireSubmit';

interface Question {
  id: string;
  title: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  required: boolean;
  options?: string[];
  helperText?: string;
}

export interface AnswersMap {
  question: string;
  answer: string | string[];
}

const SUBMIT_QUESTIONNAIRE = gql`
  mutation SubmitQuestionnaire($answers: [QuestionnaireAnswerInput!]!) {
    submitQuestionnaire(answers: $answers)
  }
`;

export interface QuestionComponentProps {
  title: React.JSX.Element;
  onAnswer: (answer: string | string[]) => void;
  currentValue?: string[];
  options?: string[];
}

export const Questionnaire: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswersMap>>({});
  const [validationError, setValidationError] = useState(false);

  const [submitQuestionnaire] = useMutation(SUBMIT_QUESTIONNAIRE);

  // Load the questions from the JSON
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('./questions.json');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Create a record to map possible question types
  const questionComponents: Record<
    Question['type'],
    React.ComponentType<QuestionComponentProps>
  > = {
    text: TextQuestion,
    number: NumberQuestion,
    select: SelectQuestion,
    checkbox: CheckboxQuestion,
  };

  const handleNextButtonClick = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const { id } = currentQuestion;

    const noAnswer = !answers[id]?.answer || answers[id]?.answer.length === 0;

    if (currentQuestion.required && noAnswer) {
      setValidationError(true);
      return;
    }

    setValidationError(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleBackButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmitButtonClick = async () => {
    const answersArray = Object.values(answers).map(({ question, answer }) => ({
      question,
      answer: Array.isArray(answer) ? answer : [answer],
    }));

    try {
      await submitQuestionnaire({ variables: { answers: answersArray } });
      console.log('Questionnaire submitted successfully!');
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    }
  };

  const handleQuestionAnswer = (
    questionId: string,
    answer: string | string[]
  ) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        question: questions[currentQuestionIndex].title,
        answer,
      },
    }));
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    // All questions have been answered
    return (
      <QuestionnaireSubmit
        answers={answers}
        onBackButtonClick={handleBackButtonClick}
        onSubmitButtonClick={handleSubmitButtonClick}
      />
    );
  }

  const { id, title, options, required, helperText } = currentQuestion;

  const currentValue = answers[id]?.answer;

  const QuestionComponent = questionComponents[currentQuestion.type];

  if (!QuestionComponent) {
    console.warn(`Unsupported question type: ${currentQuestion.type}`);
    return null;
  }

  // The title should consist of the title text, required asterisk, and helper text (if applicable)
  const newTitle = (
    <QuestionTitle title={title} required={required} helperText={helperText} />
  );

  // If currentValue is a string then convert to string[]. Otherwise leave as is. CurrentValue could
  // possibly be undefined
  const normalizedCurrentValue = currentValue
    ? Array.isArray(currentValue)
      ? currentValue
      : [currentValue]
    : undefined;

  return (
    <div>
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          width: '40%',
          margin: '30px auto',
          padding: '40px',
          borderRadius: '16px',
        }}
      >
        {validationError && (
          <Typography variant="body2" color="error">
            This question is required.
          </Typography>
        )}
        <QuestionComponent
          title={newTitle}
          options={options}
          currentValue={normalizedCurrentValue}
          onAnswer={(answer: string | string[]) =>
            handleQuestionAnswer(id, answer)
          }
        />
      </Box>
      <Grid
        container
        justifyContent="space-between"
        sx={{ width: '40%', margin: '16px auto' }}
      >
        <Grid item>
          {currentQuestionIndex !== 0 && (
            <Button variant="contained" onClick={handleBackButtonClick}>
              Back
            </Button>
          )}
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleNextButtonClick}>
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
