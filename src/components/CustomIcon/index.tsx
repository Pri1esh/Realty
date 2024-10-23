import { ICustomIcon } from '@interfaces';
import { useEffect, useState } from 'react';

const CustomIcon = (props: ICustomIcon) => {
  const { iconName, classname } = props;
  const [showIcon, setShowIcon] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setShowIcon(true), 1);
  }, []);

  return <i className={`iconfonts icon-${iconName} ${classname ? classname : ''} ${showIcon ? '' : 'opacity-0'}`}></i>;
};

export default CustomIcon;
