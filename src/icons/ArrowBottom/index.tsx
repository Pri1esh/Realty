import React from 'react';
interface IArrowBottom {
  className?: string;
}
const ArrowBottom = (props: IArrowBottom) => {
  const { className } = props;
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <path
        d="M25.59,12.83l-9.12,7.5c-0.14,0.11-0.31,0.17-0.48,0.17s-0.34-0.06-0.48-0.17l-9.12-7.5
        c-0.32-0.26-0.37-0.74-0.1-1.06s0.74-0.37,1.06-0.1L16,18.78l8.64-7.11c0.32-0.26,0.79-0.22,1.06,0.1S25.91,12.57,25.59,12.83z"
      />
    </svg>
  );
};

export { ArrowBottom };
