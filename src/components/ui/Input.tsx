import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="ui-input-wrapper">
      {label && <label htmlFor={id} className="ui-label"><span>{label}</span></label>}
      <input id={id} className="ui-input" {...props} />
    </div>
  );
};

export default Input;
