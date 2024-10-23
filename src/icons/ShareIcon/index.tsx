import React from 'react';
interface IShareIcon {
  className?: string;
}
const ShareIcon = (props: IShareIcon) => {
  const { className } = props;
  return (
    <svg viewBox="0 0 20 18" width="20" height="18" className={className}>
      <path
        d="M10.473 10.925V8.681S4.11 7.663 1.067 17c0 0-1.472-14.214 9.406-13.546V1L19 5.968l-8.527 4.957z"
        stroke="#3A3A3A"
        strokeWidth="1.21"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { ShareIcon };
