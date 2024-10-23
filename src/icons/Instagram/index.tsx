import React, { FC } from 'react';

interface Iprops {
  className?: string;
}
const Instagram: FC<Iprops> = ({ className }) => {
  return (
    <svg viewBox="0 0 20 20" className={className}>
      <circle cx="10" cy="10" r="3.2"></circle>
      <path d="M14.4,0 L5.6,0 C2.50865675,0.00350106414 0.00350106414,2.50865675 0,5.6 L0,14.4 C0.00350106414,17.4913432 2.50865675,19.9964989 5.6,20 L14.4,20 C17.4913432,19.9964989 19.9964989,17.4913432 20,14.4 L20,5.6 C19.9964989,2.50865675 17.4913432,0.00350106414 14.4,0 Z M10,14.8 C7.3490332,14.8 5.2,12.6509668 5.2,10 C5.2,7.3490332 7.3490332,5.2 10,5.2 C12.6509668,5.2 14.8,7.3490332 14.8,10 C14.7970043,12.6497249 12.6497249,14.7970043 10,14.8 Z M15.2,6 C14.5372583,6 14,5.4627417 14,4.8 C14,4.1372583 14.5372583,3.6 15.2,3.6 C15.8627417,3.6 16.4,4.1372583 16.4,4.8 C16.4,5.4627417 15.8627417,6 15.2,6 Z"></path>
    </svg>
  );
};
export { Instagram };
