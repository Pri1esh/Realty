import React, { FC } from 'react';

interface Iprops {
  className?: string;
}

const Commercial: FC<Iprops> = ({ className }) => {
  return (
    <svg viewBox="0 0 20 20" className={className}>
      <path
        d="M18.82,17.61h-0.29v-7.09c0.65-0.76,1.08-1.78,1.2-2.93c0.01-0.02,0.04-0.02,0.05-0.04
		C19.97,7.31,20.04,7,19.97,6.7l-1.33-5.55c-0.11-0.45-0.51-0.77-0.97-0.77H2.33c-0.46,0-0.86,0.32-0.97,0.77L0.03,6.7
		c-0.07,0.3,0,0.61,0.19,0.85c0.01,0.02,0.03,0.02,0.05,0.04c0.12,1.15,0.56,2.17,1.2,2.93v7.09H1.18c-0.55,0-1,0.45-1,1s0.45,1,1,1
		h1.29h15.06h1.29c0.55,0,1-0.45,1-1S19.37,17.61,18.82,17.61z M2.34,7.93h3.62C5.67,9.04,4.96,9.85,4.14,9.85S2.61,9.04,2.34,7.93z
		 M15.86,9.85c-0.81,0-1.53-0.81-1.81-1.92h3.61C17.39,9.04,16.67,9.85,15.86,9.85z M3.12,2.39h13.75l0.85,3.55h-4.8H7.07h-4.8
		L3.12,2.39z M11.81,7.93C11.53,9.04,10.81,9.85,10,9.85S8.47,9.04,8.19,7.93H11.81z M3.47,17.61v-5.84
		c0.22,0.05,0.44,0.08,0.67,0.08c1.17,0,2.21-0.66,2.93-1.67c0.72,1.02,1.76,1.67,2.93,1.67s2.21-0.66,2.93-1.67
		c0.72,1.02,1.76,1.67,2.93,1.67c0.23,0,0.45-0.04,0.67-0.08v5.84H3.47z"
      />
    </svg>
  );
};
export { Commercial };
