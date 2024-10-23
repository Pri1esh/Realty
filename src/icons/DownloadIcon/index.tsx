import React from 'react';
interface IDownloadIcon {
  className?: string;
}

const DownloadIcon = (props: IDownloadIcon) => {
  const { className } = props;
  return (
    <svg viewBox="0 0 20 20" className={className}>
      <path
        d="M17.12,3.47l-2.84-2.96c-0.29-0.31-0.71-0.48-1.14-0.48H5.51C3.87,0.03,2.53,1.36,2.53,3v13.96
	c0,1.64,1.33,2.97,2.97,2.97h9.08c1.64,0,2.97-1.33,2.97-2.97V4.56C17.56,4.15,17.41,3.77,17.12,3.47z M15.52,4.69h-2.48V2.11
	L15.52,4.69z M14.58,17.93H5.51c-0.54,0-0.97-0.44-0.97-0.97V3c0-0.54,0.44-0.97,0.97-0.97h5.54v2.83c0,1.01,0.82,1.84,1.84,1.84
	h2.68v10.26C15.56,17.49,15.12,17.93,14.58,17.93z M13.18,11.7c0.4,0.38,0.41,1.02,0.03,1.41l-2.4,2.49c0,0-0.01,0-0.01,0.01
	c-0.09,0.09-0.2,0.17-0.33,0.22c-0.12,0.05-0.26,0.08-0.39,0.08c-0.13,0-0.26-0.03-0.38-0.08c-0.07-0.03-0.12-0.07-0.18-0.12
	c-0.04-0.03-0.1-0.05-0.14-0.09l-2.49-2.4c-0.4-0.38-0.41-1.02-0.03-1.41c0.38-0.4,1.02-0.41,1.41-0.03l0.8,0.77V8.77
	c0-0.55,0.45-1,1-1s1,0.45,1,1v3.66l0.68-0.7C12.15,11.33,12.79,11.32,13.18,11.7z"
      />
    </svg>
  );
};

export { DownloadIcon };