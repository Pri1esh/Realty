import { INavBar } from '@interfaces';
import { FC } from 'react';
import MainNav from './MainNav';
import NavBrand from './NavBrand';

const NavBar: FC<INavBar> = (props) => {
  const {
    navData,
    menuData,
    buLogo,
    buLink,
    buLogoAltText,
    buPrimaryNavCallback,
    pageName,
    searchData,
    reference,
    searchActive,
    isBordered,
  } = props;

  return (
    <nav className="navbar navbar-light mainNav">
      <NavBrand
        menuData={menuData}
        buLogo={buLogo}
        buLogoAltText={buLogoAltText}
        buLink={buLink}
        pageName={pageName}
        searchData={searchData}
        reference={reference}
        searchActive={searchActive}
        isBordered={isBordered}
      />
      <MainNav navData={navData} buPrimaryNavCallback={buPrimaryNavCallback} pageName={pageName} />
    </nav>
  );
};
export default NavBar;
