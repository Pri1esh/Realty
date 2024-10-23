import { ICustomClickAnchor } from '@interfaces';

const CustomClickAnchor = (props: ICustomClickAnchor) => {
  const { anchorText = '', anchorLink = '', offset = 0 } = props;

  const handleClick = (e: any) => {
    e.preventDefault();
    window &&
      document.querySelector(anchorLink) &&
      window.scrollTo(0, document.querySelector(anchorLink).offsetTop - offset);
  };

  return (
    <>
      <a onClick={(e) => handleClick(e)}>{anchorText}</a>
    </>
  );
};

export default CustomClickAnchor;
