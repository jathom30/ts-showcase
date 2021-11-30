import * as React from 'react';

type ButtonType = {
  disabled?: boolean
  primary?: boolean
  onClick?: () => void
}

export const Button: React.FC<ButtonType> = ({children, disabled, primary, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`Button ${primary ? 'Button--primary' : ''}`}
    >
      {children}
    </button>
  )
}