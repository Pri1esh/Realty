import React from 'react';
interface ILocationPin {
  className?: string;
}
const LocationPin = (props: ILocationPin) => {
  const { className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 21" className={className}>
      <g transform="translate(1 1)">
        <path d="M12.772 6.808A6.607 6.607 0 0 0 6.387 0 6.607 6.607 0 0 0 .003 6.808c0 6.19 6.384 11.76 6.384 11.76s6.385-5.57 6.385-11.76z" />
        <ellipse cx="6.163" cy="6.98" rx="3.08" ry="3.079" />
      </g>
    </svg>
  );
};

export { LocationPin };
