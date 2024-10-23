import React from 'react';
interface IQuotationBlog {
  className?: string;
}
const QuotationBlog = (props: IQuotationBlog) => {
  const { className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 34" className={className}>
      <g>
        <g transform="translate(-258.000000, -1665.000000)">
          <g transform="translate(229.000000, 1650.000000)">
            <g transform="translate(29.300000, 15.000000)">
              <path
                d="M16.7,33.3 L-1.42108547e-14,33.3 L-1.42108547e-14,16.7 C-1.42108547e-14,6.83333333 5.56666667,1.26666667 16.7,0 L16.7,8.3 C11.3,8.5 8.53333333,11.3 8.4,16.7 L16.7,16.7 L16.7,33.3 Z M41.7,33.3 L25,33.3 L25,16.7 C25,6.83333333 30.5666667,1.26666667 41.7,0 L41.7,8.3 C36.3,8.5 33.5333333,11.3 33.4,16.7 L41.7,16.7 L41.7,33.3 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export { QuotationBlog };
