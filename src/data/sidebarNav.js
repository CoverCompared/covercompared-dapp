import { useHistory } from 'react-router';
import { ReactComponent as HomeIcon } from '../assets/img/home-icon.svg';
import { ReactComponent as MyInsuranceIcon } from '../assets/img/dashboard-icon.svg';
import { ReactComponent as AboutUsIcon } from '../assets/img/about-us-icon.svg';
import { ReactComponent as AboutTokenIcon } from '../assets/img/about-token-icon.svg';
import { ReactComponent as ContactUsIcon } from '../assets/img/contact-us-icon.svg';
import { ReactComponent as LearnMoreIcon } from '../assets/img/learn-more-icon.svg';
import { ReactComponent as SubscribeIcon } from '../assets/img/subscribe-icon.svg';
import { ReactComponent as PartnerIcon } from '../assets/img/partner-icon.svg';
import { ReactComponent as FAQIcon } from '../assets/img/faq-icon.svg';

const nav = [
  { name: 'Home', to: '/', icon: HomeIcon, authProtected: false },
  { name: 'My Account', to: '/my-account', icon: MyInsuranceIcon, authProtected: true },
  { name: 'About Us', to: '/about-us', icon: AboutUsIcon, authProtected: false },
  { name: 'About Token', to: '/about-token', icon: AboutTokenIcon, authProtected: false },
  { name: 'Contact Us', to: '/contact-us', icon: ContactUsIcon, authProtected: false },
  { name: 'Our Partners', to: '/partners', icon: PartnerIcon, authProtected: false },
  { name: 'Subscribe', to: '/subscribe', icon: SubscribeIcon, authProtected: false },
  { name: 'Blogs', to: '/blogs', icon: LearnMoreIcon, authProtected: false },
  { name: 'FAQ', to: '/faq', icon: FAQIcon, authProtected: false },
];

const navigation = () => {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  return nav.map((m) => ({ ...m, current: m.to === pathname }));
};

export default navigation;
