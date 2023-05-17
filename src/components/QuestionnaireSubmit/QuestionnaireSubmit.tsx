import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { AnswersMap } from '../Questionnaire/Questionnaire';

interface QuestionnaireSubmitProps {
  answers: Record<string, AnswersMap>;
  onBackButtonClick: () => void;
  onSubmitButtonClick: () => void;
}

export const QuestionnaireSubmit: React.FC<QuestionnaireSubmitProps> = ({
  answers,
  onBackButtonClick,
  onSubmitButtonClick,
}) => {
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
        <p>
          Review your answers. Once you confirm the answers are correct, hit
          submit. Otherwise, hit back to edit.
        </p>
        <div>
          {Object.entries(answers).map(([questionId, { question, answer }]) => (
            <p key={questionId}>
              <b>{question} </b>
              {Array.isArray(answer) ? answer.join(', ') : answer}
            </p>
          ))}
        </div>
      </Box>
      <Grid
        container
        justifyContent="space-between"
        sx={{ width: '40%', margin: '16px auto' }}
      >
        <Grid item>
          <Button variant="contained" onClick={onBackButtonClick}>
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onSubmitButtonClick}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
