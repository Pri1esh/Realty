import React from 'react';
interface IPdfIcon {
  className?: string;
}
const PdfIcon = (props: IPdfIcon) => {
  const { className } = props;
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <path
        d="M26.19,6.26c-0.01-0.02-0.02-0.03-0.02-0.04c-0.07-0.13-0.15-0.25-0.25-0.36l-4.18-4.36
		c-0.14-0.14-0.3-0.25-0.47-0.34c-0.01-0.01-0.02-0.01-0.03-0.02C21.02,1.05,20.8,1,20.57,1H9.31C7.29,1,5.65,2.64,5.65,4.66v22.68
		c0,2.02,1.64,3.66,3.66,3.66h13.38c2.02,0,3.66-1.64,3.66-3.66V6.96C26.35,6.71,26.29,6.48,26.19,6.26z M23.74,5.79h-1.96
		c-0.05,0-0.09-0.04-0.09-0.09V3.62L23.74,5.79z M22.69,29.5H9.31c-1.19,0-2.16-0.97-2.16-2.16V4.66c0-1.19,0.97-2.16,2.16-2.16
		l10.88,0.03v3.17c0,0.88,0.72,1.59,1.59,1.59h3.07v20.05C24.85,28.53,23.88,29.5,22.69,29.5z M12.81,13.36
		c-0.17-0.15-0.37-0.27-0.6-0.35c-0.23-0.08-0.47-0.12-0.72-0.12h-1.47c-0.25,0-0.44,0.07-0.57,0.22c-0.13,0.15-0.2,0.32-0.2,0.53
		v3.84c0,0.09,0.02,0.17,0.05,0.25s0.08,0.15,0.14,0.21c0.06,0.06,0.13,0.11,0.2,0.14s0.16,0.05,0.24,0.05
		c0.08,0,0.16-0.02,0.24-0.05s0.14-0.08,0.2-0.14c0.06-0.06,0.1-0.13,0.14-0.21s0.05-0.16,0.05-0.25v-0.96h0.92
		c0.28,0,0.54-0.04,0.78-0.12c0.24-0.08,0.45-0.2,0.62-0.35s0.31-0.34,0.4-0.57c0.1-0.23,0.15-0.49,0.15-0.77s-0.05-0.54-0.15-0.77
		C13.12,13.7,12.98,13.51,12.81,13.36z M11.94,15.19c-0.11,0.12-0.3,0.18-0.56,0.18H10.5v-1.36h0.9c0.25,0,0.43,0.06,0.54,0.19
		c0.11,0.12,0.17,0.29,0.17,0.5S12.06,15.07,11.94,15.19z M18.26,14.17c-0.11-0.27-0.26-0.5-0.47-0.69
		c-0.21-0.19-0.46-0.34-0.76-0.44c-0.3-0.11-0.66-0.16-1.07-0.16h-1.07c-0.28,0-0.5,0.08-0.64,0.24c-0.14,0.16-0.22,0.35-0.22,0.59
		v3.54c0,0.24,0.07,0.43,0.22,0.6c0.15,0.16,0.36,0.24,0.64,0.24h1.07c0.43,0,0.79-0.06,1.09-0.17s0.56-0.27,0.76-0.47
		c0.2-0.2,0.36-0.44,0.46-0.71c0.11-0.28,0.17-0.58,0.2-0.9c0.01-0.13,0.01-0.26,0.01-0.39c0-0.13-0.01-0.27-0.02-0.4
		C18.44,14.73,18.37,14.44,18.26,14.17z M17.22,15.77c-0.02,0.34-0.13,0.6-0.32,0.8c-0.19,0.2-0.49,0.29-0.91,0.29h-0.71v-2.77h0.71
		c0.43,0,0.74,0.1,0.93,0.31s0.29,0.49,0.3,0.86c0,0.08,0.01,0.16,0.01,0.25C17.23,15.59,17.23,15.68,17.22,15.77z M22.86,13.04
		c0.12,0.11,0.17,0.24,0.17,0.41c0,0.08-0.02,0.15-0.05,0.23s-0.08,0.13-0.13,0.18c-0.06,0.05-0.12,0.09-0.19,0.13
		s-0.15,0.05-0.22,0.05h-1.9v1.04h1.72c0.17,0,0.31,0.05,0.42,0.17c0.11,0.11,0.17,0.25,0.17,0.41c0,0.08-0.02,0.15-0.05,0.22
		c-0.03,0.07-0.08,0.13-0.13,0.18s-0.12,0.09-0.19,0.12c-0.07,0.03-0.15,0.05-0.22,0.05h-1.72v1.25c0,0.18-0.06,0.33-0.18,0.46
		s-0.27,0.18-0.45,0.18c-0.08,0-0.16-0.02-0.24-0.05s-0.14-0.08-0.2-0.14c-0.06-0.06-0.1-0.13-0.14-0.21s-0.05-0.16-0.05-0.24v-3.77
		c0-0.24,0.07-0.43,0.22-0.59c0.15-0.16,0.36-0.24,0.64-0.24h2.29C22.6,12.88,22.74,12.93,22.86,13.04z"
      />
    </svg>
  );
};

export { PdfIcon };
