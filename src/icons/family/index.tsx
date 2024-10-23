import React from 'react';
interface IFamilyIcon {
  className?: string;
}
const FamilyIcon = (props: IFamilyIcon) => {
  const { className } = props;
  return (
    <svg x="0px" y="0px" viewBox="0 0 32 32" className={className}>
      <g></g>
      <g>
        <rect />
        <path
          d="M8.35,7.51c1.75,0,3.18-1.43,3.18-3.18c0-1.75-1.43-3.18-3.18-3.18c-1.75,0-3.18,1.43-3.18,3.18
		C5.17,6.09,6.6,7.51,8.35,7.51z M8.35,2.66c0.93,0,1.68,0.75,1.68,1.68c0,0.92-0.75,1.68-1.68,1.68c-0.92,0-1.68-0.75-1.68-1.68
		C6.67,3.41,7.43,2.66,8.35,2.66z M11.94,29.27c-0.29,0.94-1.14,1.57-2.12,1.57c-0.57,0-1.08-0.22-1.47-0.57
		c-0.39,0.35-0.9,0.57-1.47,0.57c-1.22,0-2.22-1-2.22-2.22v-8.01c-0.31,0.13-0.65,0.22-1.01,0.22c-1.42,0-2.57-1.15-2.57-2.57
		c0-0.01,0.01-0.02,0.01-0.03c0-0.01-0.01-0.02-0.01-0.03v-0.93v-3.49v-0.9c0-2.18,1.78-3.96,3.96-3.96h6.61
		c0.61,0,1.23,0.14,1.77,0.42c0.37,0.19,0.52,0.64,0.33,1.01c-0.18,0.37-0.63,0.52-1.01,0.33c-0.34-0.17-0.71-0.26-1.1-0.26H5.05
		c-1.36,0-2.46,1.1-2.46,2.46v0.9v3.49v0.93c0,0.01-0.01,0.02-0.01,0.03c0,0.01,0.01,0.02,0.01,0.03c0,0.59,0.48,1.07,1.07,1.07
		c0.46,0,0.86-0.3,1.01-0.74v-4.51c0-0.41,0.34-0.75,0.75-0.75s0.75,0.34,0.75,0.75v14.54c0,0.4,0.32,0.72,0.72,0.72
		s0.72-0.32,0.72-0.72v-6.96c0-0.41,0.34-0.75,0.75-0.75c0.41,0,0.75,0.34,0.75,0.75v6.96c0,0.4,0.32,0.72,0.72,0.72
		c0.32,0,0.6-0.2,0.69-0.51c0.12-0.4,0.54-0.62,0.94-0.5C11.84,28.46,12.07,28.88,11.94,29.27z M11.29,13.33
		c0.41,0,0.75,0.34,0.75,0.75v0.86c0,0.41-0.34,0.75-0.75,0.75s-0.75-0.34-0.75-0.75v-0.86C10.54,13.67,10.88,13.33,11.29,13.33z
		 M24.45,7.51c1.75,0,3.18-1.43,3.18-3.18c0-1.75-1.43-3.18-3.18-3.18c-1.75,0-3.18,1.43-3.18,3.18C21.27,6.09,22.7,7.51,24.45,7.51
		z M24.45,2.66c0.92,0,1.68,0.75,1.68,1.68c0,0.92-0.75,1.68-1.68,1.68c-0.93,0-1.68-0.75-1.68-1.68
		C22.77,3.41,23.53,2.66,24.45,2.66z M27.35,8.91h-5.8c-1.47,0-2.77,0.98-3.31,2.5c-0.14,0.39,0.06,0.82,0.45,0.96
		c0.38,0.14,0.82-0.06,0.96-0.45c0.33-0.91,1.07-1.5,1.9-1.5h5.8c1.14,0,2.07,1.1,2.07,2.46v0.9v3.49v0.88
		c0,0.59-0.48,1.07-1.07,1.07c-0.14,0-0.27-0.03-0.39-0.08l-0.41-1.43v-3.62c0-0.41-0.34-0.75-0.75-0.75s-0.75,0.34-0.75,0.75v3.73
		c0,0.07,0.01,0.14,0.03,0.21l1.69,5.93h-7.62c-0.41,0-0.75,0.34-0.75,0.75s0.34,0.75,0.75,0.75h0.62v3.17c0,1.22,1,2.22,2.22,2.22
		c0.57,0,1.08-0.22,1.47-0.57c0.39,0.35,0.9,0.57,1.47,0.57c1.22,0,2.22-1,2.22-2.22v-3.17h0.62c0.24,0,0.46-0.11,0.6-0.3
		s0.19-0.43,0.12-0.66l-1.08-3.79c1.36-0.03,2.45-1.12,2.5-2.47c0-0.02,0.01-0.03,0.01-0.05v-0.93v-3.49v-0.9
		C30.92,10.68,29.32,8.91,27.35,8.91z M22.98,29.34c-0.4,0-0.72-0.32-0.72-0.72v-3.17h1.44v3.17C23.7,29.02,23.38,29.34,22.98,29.34
		z M26.64,28.63c0,0.4-0.32,0.72-0.72,0.72s-0.72-0.32-0.72-0.72v-3.17h1.44V28.63z M22.1,15.63c-0.41,0-0.75-0.34-0.75-0.75v-0.8
		c0-0.41,0.34-0.75,0.75-0.75s0.75,0.34,0.75,0.75v0.8C22.85,15.3,22.52,15.63,22.1,15.63z M15.51,15.85c1.25,0,2.27-1.02,2.27-2.27
		s-1.02-2.27-2.27-2.27s-2.27,1.02-2.27,2.27S14.26,15.85,15.51,15.85z M15.51,12.71c0.48,0,0.87,0.39,0.87,0.87
		s-0.39,0.87-0.87,0.87s-0.87-0.39-0.87-0.87S15.03,12.71,15.51,12.71z M22.21,18.46c0-1.05-0.84-1.9-1.88-1.9h-9.62
		c-1.05,0-1.9,0.85-1.9,1.9s0.85,1.9,1.9,1.9h1.58v8.48c0,1.08,0.88,1.96,1.96,1.96c0.48,0,0.92-0.17,1.26-0.46
		c0.34,0.29,0.78,0.46,1.26,0.46c1.08,0,1.96-0.88,1.96-1.96v-8.48h1.58C21.37,20.35,22.21,19.5,22.21,18.46z M18.05,18.95
		c-0.39,0-0.7,0.31-0.7,0.7v9.18c0,0.31-0.25,0.56-0.56,0.56s-0.56-0.25-0.56-0.56v-6.26c0-0.39-0.31-0.7-0.7-0.7s-0.7,0.31-0.7,0.7
		v6.26c0,0.31-0.25,0.56-0.56,0.56s-0.56-0.25-0.56-0.56v-9.18c0-0.39-0.31-0.7-0.7-0.7h-2.28c-0.27,0-0.5-0.22-0.5-0.5
		s0.22-0.5,0.5-0.5h9.62c0.27,0,0.48,0.22,0.48,0.5s-0.22,0.5-0.48,0.5H18.05z"
        />
      </g>
    </svg>
  );
};

export { FamilyIcon };
