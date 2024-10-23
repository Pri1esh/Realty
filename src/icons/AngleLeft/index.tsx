import React from 'react';
interface IAngleLeft {
  className?: string;
}
const AngleLeft = (props: IAngleLeft) => {
  const { className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={className}>
      <g>
        <g transform="translate(-1182.000000, -2141.000000)">
          <g id="Group-13" transform="translate(807.000000, 2118.000000)">
            <path
              d="M383.331985,23.7791045 L389.137887,28.9943145 L383.331985,34.2095245 L382.797385,33.6143745 L387.488,29.3991045 L375,29.4 L375,28.6 L387.501,28.5991045 L382.797385,24.3742545 L383.331985,23.7791045 Z"
              id="Previous"
              transform="translate(382.068944, 28.994315) scale(-1, 1) translate(-382.068944, -28.994315) "
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export { AngleLeft };
