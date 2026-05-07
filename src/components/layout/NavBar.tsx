import navData from '../../data/nav_data';
import NavItem from './NavItem';

const NavBar: React.FC = () => {
  const mainLinks = navData.slice(0, -1);
  const ctaLink = navData[navData.length - 1];

  return (
    <nav className="hidden md:flex items-center gap-8">
      {mainLinks.map((item, i) => (
        <NavItem key={i} nav={item.nav} to={item.to} />
      ))}
      <NavItem nav={ctaLink.nav} to={ctaLink.to} isButton />
    </nav>
  );
};

export default NavBar;
