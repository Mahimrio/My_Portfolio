import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`ui-card ${className}`}>
      <div style={{ display: 'contents' }}>{children}</div>
    </div>
  );
};

export default Card;
