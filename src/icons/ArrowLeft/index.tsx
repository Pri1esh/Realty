import React from 'react';
interface IArrowLeft {
  className?: string;
}
const ArrowLeft = (props: IArrowLeft) => {
  const { className } = props;
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <path
        d="M20.33,24.64c0.26,0.32,0.22,0.79-0.1,1.06c-0.14,0.12-0.31,0.17-0.48,0.17c-0.22,0-0.43-0.09-0.58-0.27
        l-7.5-9.12c-0.23-0.28-0.23-0.68,0-0.95l7.5-9.12c0.26-0.32,0.74-0.37,1.06-0.1s0.37,0.74,0.1,1.06L13.22,16L20.33,24.64z"
      />
    </svg>
  );
};

export { ArrowLeft };
