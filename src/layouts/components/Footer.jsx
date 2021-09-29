import React from 'react';
import uniqid from 'uniqid';
import TelegramIcon from '../../assets/img/telegram.svg';
import InstagramIcon from '../../assets/img/instagram.svg';
import LinkdinIcon from '../../assets/img/linkedin.svg';
import GithubIcon from '../../assets/img/github.svg';
import GitbookIcon from '../../assets/img/gitbook.svg';
import TwitterIcon from '../../assets/img/twitter.svg';

const Footer = () => {
  const socialMedia = [
    { href: 'https://t.me/PolkaCover', name: 'Telegram', icon: TelegramIcon },
    { href: 'https://twitter.com/polkacover?s=11', name: 'Twitter', icon: TwitterIcon },
    { href: 'https://www.instagram.com/polka_cover/', name: 'Instagram', icon: InstagramIcon },
    { href: 'https://www.linkedin.com/company/polkacover/', name: 'Linkdin', icon: LinkdinIcon },
    { href: 'https://github.com/Polkacover', name: 'Github', icon: GithubIcon },
    { href: 'https://polkacover.gitbook.io/docs/', name: 'Gitbook', icon: GitbookIcon },
  ];

  return (
    <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-2 md:px-20 mb-8 pt-2 pb-10 md:pb-0">
      <div className="text-dark-blue text-body-md font-Montserrat font-semibold dark:text-white col-span-12 md:col-span-1 flex  md:justify-start justify-center md:mb-0 mb-2 ">
        Copyright © 2021 PolkaCover.com
      </div>
      <div className="text-dark-blue text-body-md font-Montserrat font-semibold flex md:justify-end justify-center dark:text-white col-span-12 md:col-span-1">
        Privacy Policy | Terms of Use
      </div>

      <div className="flex justify-center mb-2 md:hidden col-span-12 md:col-span-0 mt-4">
        {socialMedia.map((item) => (
          <a key={uniqid()} href={item.href}>
            <div className="rounded-full h-5 w-5 hover:bg-bluegradient flex items-center justify-center mx-1.5">
              <img src={item.icon} alt={item.name} className="h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default Footer;
