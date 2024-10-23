import React, { FC } from 'react';

interface Iprops {
  className?: string;
}
const Wilmar: FC<Iprops> = ({ className }) => {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <path
        d="M19.75,12.04L19.34,9.3c0.67-0.32,1.14-1,1.14-1.79V7.37c0-0.84-0.53-1.55-1.27-1.84c0.02-0.1,0.03-0.21,0.03-0.31V4.03
	c0-0.92-0.75-1.67-1.67-1.67h-3.16c-0.92,0-1.67,0.75-1.67,1.67v1.18c0,0.11,0.01,0.21,0.03,0.31c-0.74,0.29-1.27,1-1.27,1.84v0.15
	c0,0.79,0.47,1.47,1.14,1.79l-0.41,2.74c-0.85,0.28-1.47,1.07-1.47,2.01v13.47c0,1.17,0.95,2.13,2.13,2.13h6.19
	c1.17,0,2.13-0.95,2.13-2.13V14.05C21.22,13.11,20.6,12.32,19.75,12.04z M13.49,7.99c-0.26,0-0.48-0.22-0.48-0.48V7.37
	c0-0.26,0.21-0.48,0.48-0.48h0.93h3.16h0.93c0.26,0,0.48,0.21,0.48,0.48v0.15c0,0.26-0.21,0.48-0.48,0.48H18.5H13.49L13.49,7.99z
	 M14.14,9.49h3.71l0.36,2.43h-4.44L14.14,9.49z M14.25,4.03c0-0.1,0.08-0.17,0.17-0.17h3.16c0.1,0,0.17,0.08,0.17,0.17v1.18
	c0,0.1-0.08,0.17-0.17,0.17h-3.16c-0.1,0-0.17-0.08-0.17-0.17V4.03z M19.72,27.52c0,0.34-0.28,0.63-0.63,0.63h-6.19
	c-0.34,0-0.63-0.28-0.63-0.63V14.05c0-0.34,0.28-0.63,0.63-0.63h0h6.18h0c0.34,0,0.63,0.28,0.63,0.63V27.52z M15.47,14.84
	c-0.68,0.94-1.81,2.65-1.81,3.51c0,1.17,1.05,2.12,2.34,2.12s2.34-0.95,2.34-2.12c0-0.86-1.13-2.57-1.81-3.51
	C16.3,14.53,15.7,14.53,15.47,14.84z M16,19.28c-0.63,0-1.14-0.41-1.14-0.92c0-0.25,0.42-1.09,1.14-2.17
	c0.72,1.08,1.14,1.92,1.14,2.17C17.14,18.86,16.63,19.28,16,19.28z"
      />
    </svg>
  );
};
export { Wilmar };
