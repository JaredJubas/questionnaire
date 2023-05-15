import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

interface QuestionTitleProps {
  title: string;
  required: boolean;
  helperText?: string;
}

export const QuestionTitle: React.FC<QuestionTitleProps> = ({
  title,
  required,
  helperText,
}) => (
  <p>
    {title}
    {required && <span style={{ color: 'red' }}>*</span>}
    {helperText && (
      <Tooltip title={helperText}>
        <IconButton size="small" aria-label="Helper">
          <HelpIcon />
        </IconButton>
      </Tooltip>
    )}
  </p>
);
