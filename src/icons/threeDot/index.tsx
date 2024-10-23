import React from 'react';
interface IThreeDot {
  className?: string;
}
const ThreeDot = (props: IThreeDot) => {
  const { className } = props;
  return (
    <svg className={className} viewBox="0 0 4 13" version="1.1">
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="group48" fill="#222222" fillRule="nonzero">
          <g
            id="Group"
            transform="translate(1.625000, 6.500000) rotate(90.000000) translate(-1.625000, -6.500000) translate(-4.875000, 4.875000)"
          >
            <circle id="Oval" cx="1.625" cy="1.625" r="1.625" />
            <circle id="Oval" cx="6.5" cy="1.625" r="1.625" />
            <circle id="Oval" cx="11.375" cy="1.625" r="1.625" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export { ThreeDot };
