import React from 'react';
import MuiButton from '@mui/material/Button';

export default function Button({ children, color = 'primary', variant = 'contained', onClick, style, ...props }) {
  return (
    <MuiButton
      color={color}
      variant={variant}
      onClick={onClick}
      style={{ textTransform: 'none', ...style }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
