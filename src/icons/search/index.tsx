import React, { FC } from 'react';

interface Iprops {
  className?: string;
}
const Search: FC<Iprops> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 20 20">
      <g transform="translate(-2.000000, -2.000000)">
        <path d="M9.97758319,2 L10.1417867,2.00500195 L10.4947296,2.02847686 C14.129857,2.34525876 17.0588776,5.14437584 17.5506886,8.73519782 L17.5804242,8.98123356 C17.6257939,9.35333864 17.6349769,9.74134998 17.6109865,10.254764 C17.5817582,10.6634922 17.5230357,11.0938686 17.4392876,11.5121977 C17.2231672,12.4885457 16.8164769,13.4146814 16.2395708,14.2468448 L16.0409924,14.5206922 L16.0020488,14.5290515 L15.9805415,14.5955118 L21.7216866,20.3370543 L21.8045651,20.4325854 C22.017415,20.7141843 22.0587341,21.0903266 21.9170563,21.412387 L21.8553268,21.5303342 L21.7816589,21.6334008 L21.699488,21.7215108 L21.6078844,21.8014777 C21.4388334,21.9309384 21.2325666,22.0004355 21.0164284,22.0004355 C20.8435562,22.0004355 20.6771559,21.9559487 20.5276885,21.8691033 L20.4189262,21.7960602 L20.3208674,21.7094537 L14.6618792,16.0093539 L14.5980939,15.9808862 L14.5225288,16.041668 L14.268011,16.2276722 C13.2279625,16.9559441 12.0325158,17.4149904 10.7731923,17.5699916 L10.4570836,17.6023875 L10.1348678,17.6220767 L9.81301974,17.6285143 L9.48165736,17.6238329 L9.14006859,17.6015835 C4.94348288,17.2465176 1.7839419,13.615225 2.01156305,9.38988118 C2.23267249,5.41998051 5.38489015,2.26191798 9.31474581,2.01571212 L9.56135487,2.00413472 L9.97758319,2 Z M9.80783085,3.95508993 L9.59059037,3.95913559 C6.57315736,4.06894838 4.13059042,6.46666443 3.9658916,9.49494649 C3.88130262,11.0643628 4.40719355,12.56591 5.44855266,13.7291025 C6.37566838,14.7554363 7.60223781,15.41126 8.95433247,15.6096683 L9.22637354,15.6432253 L9.57375853,15.6693758 L9.82361429,15.6736224 L10.0580068,15.6688973 C12.6894931,15.5622839 14.970963,13.6576396 15.5338922,11.0886931 C15.5939468,10.788536 15.6357274,10.4638468 15.6570055,10.1342891 C15.6782865,9.75134464 15.6725159,9.4588433 15.638172,9.19194435 C15.3554887,6.48883911 13.2777031,4.36878358 10.6015079,4.00890189 L10.3638505,3.98174549 L10.1311074,3.96430084 L9.97388016,3.95639703 L9.80783085,3.95508993 Z"></path>
      </g>
    </svg>
  );
};
export { Search };
