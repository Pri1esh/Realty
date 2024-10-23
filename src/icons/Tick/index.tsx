import React from 'react';
interface ITickIcon {
  className?: string;
}
const Tick = (props: ITickIcon) => {
  const { className } = props;
  return (
    <svg viewBox="0 0 10 8" className={className}>
      <g id="Page-1">
        <g id="Restaurant-Details" transform="translate(-92.000000, -1968.000000)" fillRule="nonzero">
          <g id="Group-14" transform="translate(90.000000, 1895.000000)">
            <g id="Group-4" transform="translate(2.000000, 56.000000)">
              <g id="Tick" transform="translate(0.000000, 17.000000)">
                <polygon points="0.847512798 3.90784438 0 4.73606948 3.80011049 8 10 0.696991209 9.02186598 0 3.65625801 6.32028719"></polygon>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export { Tick };
