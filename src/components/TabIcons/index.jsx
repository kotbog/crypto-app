import HomeIcon from '../../assets/icons/home-icon.svg'
import PortfolioIcon from '../../assets/icons/portfolio-icon.svg'
import SearchIcon from '../../assets/icons/search-icon.svg'
import ProfileIcon from '../../assets/icons/profile-icon.svg'
export default function TabIcons({route, focused, size}) {
    let IconComponent;
    if (route.name === 'Home') {
        IconComponent = HomeIcon;
    } else if (route.name === 'Portfolio') {
        IconComponent = PortfolioIcon;
    }

    return <IconComponent width={size} height={size} fill={'#000'} />;
}