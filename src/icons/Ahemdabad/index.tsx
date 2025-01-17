import React, { FC } from 'react';

interface Iprops {
  className?: string;
}
const Ahemdabad: FC<Iprops> = ({ className }) => {
  return (
    <svg viewBox="0 0 20 20" className={className}>
      <path
        className="st8"
        d="M16.53,7.45c-0.5,0-0.98,0.12-1.41,0.31V7.51V1.09c0-0.55-0.45-1-1-1s-1,0.45-1,1v2.39
  c-0.87-0.67-1.95-1.09-3.13-1.09c-1.18,0-2.25,0.42-3.12,1.09V1.09c0-0.55-0.45-1-1-1s-1,0.45-1,1v6.42v0.26
  c-0.43-0.2-0.9-0.31-1.4-0.31c-1.88,0-3.41,1.53-3.41,3.41v1.16v6.89c0,0.55,0.45,1,1,1h4.81c0,0,0,0,0,0h8.25c0,0,0,0,0,0h4.81
  c0.55,0,1-0.45,1-1v-6.89v-1.16C19.94,8.98,18.41,7.45,16.53,7.45z M16.53,9.45c0.77,0,1.41,0.63,1.41,1.41v0.7h-2.81v-0.7
  C15.12,10.08,15.76,9.45,16.53,9.45z M10.01,4.39c1.37,0,2.53,0.89,2.95,2.12H7.04C7.46,5.28,8.63,4.39,10.01,4.39z M3.47,9.45
  c0.77,0,1.4,0.63,1.4,1.41v0.6H2.07v-0.6C2.07,10.08,2.7,9.45,3.47,9.45z M2.07,13.46h2.81v2.53v1.92H2.07V13.46z M6.88,15.99v-3.97
  v-1.16V8.51h6.25v2.35v1.16v3.97v1.92h-2.15v-3.47c0-0.55-0.45-1-1-1s-1,0.45-1,1v3.47h-2.1V15.99z M15.12,17.91v-1.92v-2.43h2.81
  v4.35H15.12z"
      />
    </svg>
  );
};
export { Ahemdabad };
