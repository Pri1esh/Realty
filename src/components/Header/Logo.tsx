import { CustomImage } from '@components';
import { ILogo } from '@interfaces';
import styles from './header.module.scss';

const Logo = (props: ILogo) => {
  const { buLogo, buLink, buLogoAltText = '' } = props;

  return (
    <div className={`brandBox ${styles.headerLogo}`} itemScope itemType="http://schema.org/Brand">
      <a href={buLink} itemProp="url">
        <CustomImage itemProp="image" src={buLogo ? buLogo : ''} alt={buLogoAltText} width="140" height="28" />{' '}
      </a>
    </div>
  );
};

export default Logo;
