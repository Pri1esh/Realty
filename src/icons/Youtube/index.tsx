import React, { FC } from 'react';

interface Iprops {
  className?: string;
}
const Youtube: FC<Iprops> = ({ className }) => {
  return (
    <svg viewBox="0 0 20 20" className={className}>
      <path d="M17.0016114,2.71622566 C17.3918048,2.76455517 18.2447053,2.76915798 19.0055249,3.61837655 C19.6052026,4.26622216 19.7997238,5.73682018 19.7997238,5.73682018 C19.7997238,5.73682018 20,7.46287419 20,9.1889282 L20,10.8068162 C20,12.3947859 19.8304862,13.9827555 19.803364,14.2266677 L19.7997238,14.2589242 L19.7997238,14.2589242 C19.7997238,14.2589242 19.6040516,15.7295222 19.0055249,16.3750664 C18.2447053,17.224285 17.3929558,17.2288878 17.0016114,17.2795187 C14.644337,17.4597551 11.2920773,17.4931095 10.2922376,17.4991491 L10.1331523,17.4999906 C10.1115051,17.5000872 10.0923595,17.5001645 10.0758176,17.500226 L9.95580681,17.5 C9.68031814,17.497096 8.15897977,17.4799551 6.58350042,17.4401631 L6.08557088,17.4268345 C4.92602241,17.3939317 3.8051864,17.3482499 3.19981584,17.2864229 C2.75437385,17.1978188 1.75644567,17.2231343 0.994475138,16.3750664 C0.394797422,15.7283715 0.200276243,14.2589242 0.200276243,14.2589242 L0.196636022,14.226688 C0.170693039,13.9935233 0.0144711602,12.5313121 0.000935690608,11.0139594 L0,9.1889282 C0,7.46287419 0.200276243,5.73797088 0.200276243,5.73797088 C0.200276243,5.73797088 0.395948435,4.26737286 0.994475138,3.61952726 C1.75529466,2.76915798 2.6070442,2.76455517 2.99838858,2.71622566 C5.35469371,2.53405125 8.70435166,2.50528687 9.70339393,2.50074513 L10.2966061,2.50074513 C11.2956483,2.50528687 14.6453063,2.53405125 17.0016114,2.71622566 Z M7.50230203,6.25003357 L7.50230203,13.7503136 L13.7546041,10.0001736 L7.50230203,6.25003357 Z"></path>
    </svg>
  );
};
export { Youtube };