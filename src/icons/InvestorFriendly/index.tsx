import React from 'react';
interface IInvestorFriendlyIcon {
  className?: string;
}
const InvestorFriendly = (props: IInvestorFriendlyIcon) => {
  const { className } = props;
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <path
        d="M13,13.62c3.11,0,5.64-2.53,5.64-5.64c0-3.11-2.53-5.64-5.64-5.64c-3.11,0-5.64,2.53-5.64,5.64
	C7.36,11.09,9.89,13.62,13,13.62z M13,4c2.2,0,3.98,1.79,3.98,3.98c0,2.19-1.79,3.98-3.98,3.98c-2.19,0-3.98-1.79-3.98-3.98
	C9.02,5.79,10.8,4,13,4z M23.25,15.22c-1.65,0-3.18,0.51-4.45,1.37c-1.8-0.98-3.83-1.51-5.91-1.51c-6.65,0-12.06,5.25-12.06,11.7
	c0,0.46,0.37,0.83,0.83,0.83h15.04c1.43,2.09,3.83,3.47,6.55,3.47c4.37,0,7.93-3.56,7.93-7.93S27.62,15.22,23.25,15.22z M2.52,25.95
	c0.44-5.15,4.92-9.21,10.37-9.21c1.59,0,3.14,0.36,4.55,1.03c-1.31,1.42-2.12,3.3-2.12,5.38c0,0.99,0.19,1.93,0.52,2.8H2.52z
	 M23.25,29.42c-3.46,0-6.27-2.81-6.27-6.27s2.81-6.27,6.27-6.27s6.27,2.81,6.27,6.27S26.7,29.42,23.25,29.42z M24.8,20.19
	c0.13,0.23,0.23,0.47,0.3,0.73h0.83c0.46,0,0.83,0.37,0.83,0.83s-0.37,0.83-0.83,0.83H25.1c-0.32,1.22-1.33,2.15-2.58,2.34
	l2.43,2.42c0.33,0.32,0.33,0.85,0,1.17c-0.16,0.16-0.38,0.25-0.59,0.25c-0.21,0-0.42-0.08-0.58-0.24l-3.81-3.78c0,0,0,0,0,0
	c-0.08-0.08-0.14-0.17-0.18-0.27c-0.04-0.1-0.06-0.21-0.06-0.32c0,0,0,0,0,0c0-0.02,0.01-0.03,0.01-0.04c0-0.09,0.02-0.19,0.06-0.27
	c0.03-0.08,0.08-0.14,0.14-0.21c0.02-0.02,0.02-0.04,0.04-0.06c0,0,0,0,0,0c0.08-0.08,0.17-0.14,0.27-0.18
	c0.1-0.04,0.21-0.06,0.31-0.06c0,0,0,0,0,0h1.49c0.54,0,1.01-0.3,1.28-0.74h-2.77c-0.46,0-0.83-0.37-0.83-0.83s0.37-0.83,0.83-0.83
	h2.77c-0.27-0.44-0.74-0.73-1.28-0.73h-1.49c-0.46,0-0.83-0.37-0.83-0.83s0.37-0.83,0.83-0.83h5.37c0.46,0,0.83,0.37,0.83,0.83
	s-0.37,0.83-0.83,0.83H24.8z"
      />
    </svg>
  );
};

export { InvestorFriendly };
