import React, { FC } from 'react';
import { ButtonInterface } from '../../Models/interfaces';

const Button: FC<ButtonInterface> = ({ name, content, classProps, clickHandler, disabled }) => {
  return (
    <button
      className={`border border-slate-500 py-[7px] px-[14px] text-center text-slate-500 disabled:cursor-not-allowed ${classProps}`}
      type="button"
      name={name}
      onClick={clickHandler}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
