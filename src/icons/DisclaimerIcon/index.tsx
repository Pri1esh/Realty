import React from 'react';
interface IDisclaimerIcon {
  className?: string;
}
const DisclaimerIcon = (props: IDisclaimerIcon) => {
  const { className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className={className}>
      <g>
        <g>
          <path
            d="M18,0L18,0C8.06,0,0,8.06,0,18v0c0,9.94,8.06,18,18,18h0c9.94,0,18-8.06,18-18v0C36,8.06,27.94,0,18,0z M18.01,28.47
			c-1.07,0.01-2.01-0.92-2.01-2c0-1.09,0.92-2,2.01-2c1.09,0.01,2.01,0.94,1.98,2.02C19.97,27.56,19.08,28.45,18.01,28.47z
			 M21.52,12.1C21,14.61,20.49,17.12,20,19.63c-0.17,0.87-0.6,1.52-1.47,1.75c-0.74,0.21-1.45,0.04-1.98-0.56
			c-0.2-0.23-0.39-0.53-0.45-0.82c-0.58-2.79-1.18-5.57-1.67-8.37c-0.38-2.2,1.41-4.12,3.63-4.07C20.35,7.64,22.05,9.59,21.52,12.1z
			"
          />
        </g>
      </g>
    </svg>
  );
};

export { DisclaimerIcon };
