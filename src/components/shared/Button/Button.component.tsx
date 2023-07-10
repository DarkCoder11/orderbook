import React from 'react';

import {ButtonProps, ButtonTypeEnum} from './types';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled = false,
  submit = false,
}) => {
  const type = submit ? ButtonTypeEnum.Submit : ButtonTypeEnum.Button;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default Button;
