import React from 'react';
interface ISearchIcon {
  className?: string;
}
const SearchIcon = (props: ISearchIcon) => {
  const { className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="262.34 257.61 235.1 234.52" className={className}>
      <g fillRule="evenodd">
        <path d="m364.16 447.04c48.391 0 87.613-39.227 87.613-87.613s-39.223-87.613-87.613-87.613c-48.387 0-87.609 39.227-87.609 87.613s39.223 87.613 87.609 87.613zm0 14.207c56.234 0 101.82-45.586 101.82-101.82s-45.586-101.82-101.82-101.82c-56.23 0-101.82 45.586-101.82 101.82s45.586 101.82 101.82 101.82z" />
        <path d="m428.38 423.07c2.7734-2.7734 7.2734-2.7734 10.047 0l56.926 56.93c2.7773 2.7734 2.7773 7.2734 0 10.047-2.7734 2.7734-7.2695 2.7734-10.043 0l-56.93-56.93c-2.7734-2.7734-2.7734-7.2695 0-10.047z" />
      </g>
    </svg>
  );
};

export { SearchIcon };
