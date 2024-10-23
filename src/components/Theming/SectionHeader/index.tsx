import { ISectionHeader } from '@interfaces';
import { FC } from 'react';
import { CustomHeader } from './Header';

const SectionHeader: FC<ISectionHeader> = ({ heading, className, h1, children, ...props }) => {
  return (
    <>
      <CustomHeader heading={heading} classNames={className} {...props}>
        {heading && (h1 ? <h1 itemProp="headline">{heading}</h1> : <h2 itemProp="headline">{heading}</h2>)}
        {children}
      </CustomHeader>
    </>
  );
};

export default SectionHeader;
