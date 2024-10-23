import React from 'react';
interface IAngleRightIcon {
  className?: string;
}
const AngleRight = (props: IAngleRightIcon) => {
  const { className } = props;
  return (
    <svg viewBox="0 0 15 12" className={className}>
      <g>
        <g transform="translate(-1183.000000, -2131.000000)">
          <g transform="translate(807.000000, 2118.000000)">
            <path
              d="M384.331985,13.7791045 L390.137887,18.9943145 L384.331985,24.2095245 L383.797385,23.6143745 L388.488,19.3991045 L376,19.4 L376,18.6 L388.501,18.5991045 L383.797385,14.3742545 L384.331985,13.7791045 Z"
              id="Next"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export { AngleRight };
