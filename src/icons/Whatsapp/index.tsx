import React, { FC } from 'react';

interface Iprops {
  className?: string;
}
const Whatsapp: FC<Iprops> = ({ className }) => {
  return (
    <svg viewBox="0 0 20 20" className={className}>
      <path
        d="M16.98,3.03C15.11,1.16,12.64,0.13,10,0.13c-5.44,0-9.87,4.42-9.87,9.86c0,1.85,0.51,3.65,1.49,5.21
		l-0.78,2.85c-0.09,0.34,0,0.71,0.25,0.97s0.62,0.35,0.96,0.26l2.95-0.77c1.51,0.88,3.23,1.35,4.99,1.35h0
		c5.44,0,9.86-4.42,9.87-9.86C19.87,7.37,18.84,4.89,16.98,3.03z M10,17.87c-1.41,0-2.8-0.38-4-1.1l-0.32-0.19
		c-0.16-0.09-0.33-0.14-0.51-0.14c-0.08,0-0.17,0.01-0.25,0.03l-1.68,0.44l0.44-1.6c0.07-0.27,0.03-0.56-0.12-0.8l-0.21-0.33
		c-0.79-1.25-1.2-2.7-1.2-4.18c0-4.33,3.53-7.86,7.87-7.86c2.1,0,4.07,0.82,5.56,2.31c1.48,1.49,2.3,3.46,2.3,5.56
		C17.86,14.34,14.34,17.87,10,17.87L10,17.87z M15.39,13.8c-0.19,0.54-1.24,1.1-1.65,1.14c-0.05,0-0.1,0.01-0.16,0.02
		c-0.12,0.01-0.24,0.03-0.39,0.03c-0.36,0-1.03-0.08-2.68-0.73c-1.64-0.65-3.27-2.08-4.59-4.03c-0.03-0.05-0.06-0.08-0.07-0.1
		C5.6,9.79,4.77,8.59,4.77,7.41c0-1.18,0.57-1.79,0.85-2.08l0.06-0.06c0.22-0.24,0.47-0.26,0.54-0.26h0.08c0.16,0,0.31,0,0.45,0.01
		C6.9,5.02,6.98,5.03,7.12,5.33c0.14,0.32,0.39,0.92,0.58,1.4c0.16,0.4,0.25,0.62,0.28,0.68c0.06,0.12,0.05,0.18,0.02,0.24
		L7.97,7.74C7.9,7.87,7.86,7.95,7.77,8.06c-0.05,0.06-0.1,0.12-0.15,0.18C7.53,8.35,7.43,8.46,7.36,8.54
		C7.23,8.67,6.92,8.98,7.19,9.46c0.21,0.36,0.78,1.27,1.61,2.01c0.93,0.83,1.75,1.18,2.14,1.35c0.07,0.03,0.13,0.06,0.17,0.08
		c0.16,0.08,0.3,0.12,0.43,0.12c0.2,0,0.37-0.08,0.52-0.26c0.13-0.15,0.7-0.82,0.91-1.13c0.06-0.09,0.08-0.09,0.09-0.09
		c0.05,0,0.15,0.04,0.2,0.05c0.22,0.08,1.5,0.7,1.88,0.9c0.06,0.03,0.11,0.05,0.16,0.08c0.09,0.05,0.21,0.1,0.25,0.14
		C15.59,12.83,15.58,13.25,15.39,13.8z"
      />
    </svg>
  );
};

export { Whatsapp };