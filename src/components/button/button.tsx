import React from 'react'
import './style.css'
import { IButtonProps } from './types';

const Button: React.FC<IButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="buttonCustom"
    >
      {buttonText}
    </button>
  );
};

export default Button
