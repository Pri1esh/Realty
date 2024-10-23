import React, { FC } from 'react';

interface Iprops {
  className?: string;
  width?: any;
  onChange?(): any;
  onClick?: any;
}
const ArrowDown: FC<Iprops> = ({ className, width, onChange }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      onClick={() => {
        if (onChange) {
          onChange();
        }
      }}
      width={width}
    >
      <path
        d="M14.9705348,2.426293 L6.41497927,11.176293 C5.86167358,11.7421738 5.86167358,12.6578262 6.41497927,13.223707 L14.9705348,21.973707 L15.094631,22.0862986 C15.667863,22.5426456 16.4762355,22.4940556 16.9850207,21.973707 L17.0822815,21.8636763 C17.5361651,21.2947359 17.5037448,20.4568063 16.9850207,19.926293 L9.43,12.2 L16.9850295,4.47369807 L17.0950756,4.34682903 C17.538684,3.7639786 17.4915837,2.94436875 16.9850207,2.426293 C16.429261,1.85790233 15.5262946,1.85790233 14.9705348,2.426293 Z"
        transform="translate(11.700000, 12.199378) scale(-1, 1) rotate(-90.000000) translate(-11.700000, -12.199378) "
      ></path>
    </svg>
  );
};
export { ArrowDown };
