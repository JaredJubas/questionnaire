import React, { useEffect, useState } from 'react';
// import questions from './questions.json';
import { CheckboxQuestion } from '../../questions/CheckboxQuestion/CheckboxQuestion';
import { NumberQuestion } from '../../questions/NumberQuestion/NumberQuestion';
import { SelectQuestion } from '../../questions/SelectQuestion/SelectQuestion';
import { TextQuestion } from '../../questions/TextQuestion/TextQuestion';
import axios from 'axios';

interface Question {
  id: string;
  title: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  required: boolean;
  options?: string[];
}

export const Questionnaire: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

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
    React.ComponentType<any>
  > = {
    text: TextQuestion,
    number: NumberQuestion,
    select: SelectQuestion,
    checkbox: CheckboxQuestion,
  };

  return (
    <div>
      {questions.map((question) => {
        const QuestionComponent = questionComponents[question.type];

        // If it's not a valid type then return null
        if (!QuestionComponent) {
          console.warn(`Unsupported question type: ${question.type}`);
          return null;
        }

        const { title, id, options } = question;

        return (
          <div key={id}>
            <QuestionComponent title={title} options={options} />
          </div>
        );
      })}
    </div>
  );
};
