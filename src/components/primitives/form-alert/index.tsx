import React from 'react';

interface FormAlertProps {
  children: string;
  className?: string;
}

const FormAlert = ({ children, className }: FormAlertProps) => (
  <span role="alert" className={`pt-1.5 font-[10px] block ${className}`}>
    {children}{' '}
  </span>
);

export default FormAlert;
