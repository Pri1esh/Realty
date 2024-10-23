import React from 'react';
interface ICheckmark {
  className?: string;
}
const Checkmark = (props: ICheckmark) => {
  const { className } = props;
  return (
    <svg viewBox="0 0 14 14" className={className}>
      <g fill="none" fillRule="evenodd">
        {/* <circle fill="#00812C" cx="7" cy="7" r="7"/> */}
        <path
          d="M6.106 10c-.175 0-.292-.067-.41-.201l-1.52-1.81a.714.714 0 0 1 0-.937c.234-.268.585-.268.819 0l1.053 1.273 2.925-4.087c.234-.268.585-.335.82-.067.234.268.292.67.058.938l-3.335 4.69c-.059.134-.234.201-.41.201z"
          fill="#00812c"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

export { Checkmark };
