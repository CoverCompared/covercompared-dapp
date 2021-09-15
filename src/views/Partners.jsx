import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import PartnerCard from '../components/PartnerCard';
import AudaceIcon from '../assets/partners/audace.png';
import Insurance971 from '../assets/partners/971 insurance.png';
import BandProtocol from '../assets/partners/Band Protocol.png';
import Bilaxy from '../assets/partners/Bilaxy.png';
import ChainLink from '../assets/partners/chain link.png';
import CollateralDefi from '../assets/partners/Collateral Defi.png';
import CoverProtocol from '../assets/partners/cover protocol.png';
import DuckDao from '../assets/partners/duck dao.png';
import FerrumNetwork from '../assets/partners/Ferrum Network.png';
import GourmetGalaxy from '../assets/partners/gourmet galaxy logo.png';
import Hacken from '../assets/partners/hacken.png';
import Hoo from '../assets/partners/Hoo.jpg';
import Innovion from '../assets/partners/Innovion.png';
import IsraeliBlockchain from '../assets/partners/Israeli Blockchain.png';
import LABSGroup from '../assets/partners/LABS Group.png';
import NFTAlley from '../assets/partners/NFT_Alley_Favicon.png';
import NsureNetwork from '../assets/partners/Nsure Network.png';
import OrionProtocol from '../assets/partners/orion protocol.png';
import PaidNetwork from '../assets/partners/Paid Network.png';
import PhantasmaChain from '../assets/partners/Phantasma Chain.png';
import PolkaInsure from '../assets/partners/PolkaInsure.png';
import RocketVault from '../assets/partners/Rocket Vault.jpg';
import TransakFinance from '../assets/partners/Transak Finance.png';
import Tribeone from '../assets/partners/TRIBEONE.png';
import UmbrellaNetwork from '../assets/partners/Umbrella Network.png';
import UniFarm from '../assets/partners/UniFarm logo.png';
import Uniswap from '../assets/partners/uniswap.png';
import Unmarshal from '../assets/partners/Unmarshal.png';
import Unore from '../assets/partners/UNORE.png';
import VitorServices from '../assets/partners/Vitor services.png';
import { classNames } from '../functions/utils';

const tabs = [
  {
    tabTitle: 'Integration',
    content: [
      {
        img: AudaceIcon,
        partnerName: 'Audace Labs',
        type: 'Integration',
        ctaLink: 'https://www.audacelabs.com',
        description:
          'PolkaCover utilizes Audace Labs to support the development of the platform. With several hackathon wins under their belt, Audace Labs is a leading blockchain development team based out of the UAE & India.',
      },
      {
        img: PaidNetwork,
        partnerName: 'Paid Network',
        type: 'Integration',
        ctaLink: 'https://paidnetwork.com',
        description:
          'Through this integration, PolkaCover will utilize PAID’s SMART Agreements to create and strengthen future internal and external agreements and streamline operations.',
      },
      {
        img: Unmarshal,
        partnerName: 'Unmarshal',
        type: 'Integration',
        ctaLink: 'https://unmarshal.io/',
        description:
          'PolkaCover will leverage Unmarshal’s data indexing and Querying services. Additionally, it fetches data across multiple blockchains such as Polkadot, BSC, and Ethereum, supporting building our AI-powered smart contract covers.',
      },
      {
        img: ChainLink,
        partnerName: 'Chainlink',
        type: 'Integration',
        ctaLink: 'https://chain.link',
        description:
          'With Chainlink, Polkacover utilizes its decentralized price feeds on PolkaCover insurance products. Key features include high quality data, secure node operations, decentralized network and economy of scale.',
      },
    ],
  },
  {
    tabTitle: 'Client',
    content: [
      {
        img: PhantasmaChain,
        partnerName: 'Phantasma Chain',
        type: 'Client',
        ctaLink: 'https://phantasma.io/',
        description:
          'Through this collaboration PolkaCover will create innovative products built around the NFTs marketplace. Both the team have assessed the risks that could befall in the future and are working together to create protection products around NFTs security against impermanent loss.',
      },
      {
        img: LABSGroup,
        partnerName: 'LABS Group',
        type: 'Client',
        ctaLink: 'https://labsgroup.io/',
        description:
          'Polkacover collaborates with LABS Group to provide insurance products like homeowner insurance, property insurance against catastrophes, Landlord personal liability cover and impermanent loss cover on the NFT Property Assets.',
      },
      {
        img: BandProtocol,
        partnerName: 'Band Protocol',
        type: 'Client',
        ctaLink: 'https://bandprotocol.com/',
        description:
          'PolkaCover collaborates with Band Protocol to protect and insure users against smart-contract exploitations, breaches and failure.',
      },
      {
        img: UmbrellaNetwork,
        partnerName: 'Umbrella Network',
        type: 'Client',
        ctaLink: 'https://www.umb.network',
        description:
          'Polkacover will bring their expertise providing affordable insurance coverage and protection to the users of Umbrella Network.',
      },
      {
        img: OrionProtocol,
        partnerName: 'Orion Protocol',
        type: 'Client',
        ctaLink: 'https://www.orionprotocol.io/',
        description:
          'PolkaCover offers a white-labeled solution to Orion Protocol to allow its users to purchase crypto insurance products instantly through their accounts. Users will have the choice to purchase suitable coverage comparing different offerings within the space.',
      },
      {
        img: RocketVault,
        partnerName: 'Rocket Vault',
        type: 'client',
        ctaLink: 'https://rocketvaults.io',
        description:
          'PolkaCover aims to integrate with Rocket Vault by providing flexible, decentralized insurance coverage for crypto assets. PolkaCover will also provide Insurance coverage on Smart Vault holdings while also providing the Smart contract to Rocket Vault.',
      },
      {
        img: GourmetGalaxy,
        partnerName: 'Gourmet Galaxy',
        type: 'Client',
        ctaLink: 'https://gourmetgalaxy.io',
        description:
          'Through this strategic collaboration, PolkaCover is working together to secure gaming NFTs in GUM, preventing an impermanent loss.',
      },
      {
        img: Tribeone,
        partnerName: 'TribeOne',
        type: 'Client',
        ctaLink: 'https://tribeone.io',
        description:
          'Under this integration, PolkaCover will provide TribeOne with ingenious crypto insurance products such as hack cover, gap cover, credit shield, NFT cover and smart contract cover within the DeFi Space.',
      },
      {
        img: IsraeliBlockchain,
        partnerName: 'Israeli Blockchain Association',
        type: 'Client',
        ctaLink: 'https://blockchainisrael.io/',
        description:
          'Through this integration, PolkaCover is developing products for Israel based DeFi and banking platforms and will be able to access InsureTech and FinTech projects based in Israel and open up access to leverage off the Israeli blockchain ecosystem.',
      },
      {
        img: NFTAlley,
        partnerName: 'NFT Alley',
        type: 'Client',
        ctaLink: 'https://nftalley.io',
        description:
          'This collaboration will allow NFT alley users to purchase various NFT covers from the PolkaCover marketplace. PolkaCover and its users will also get access to benefits such as Multi-Chain NFT Trades, Scalability, Realistic Price Discovery Mechanism on the NFT Alley platform.',
      },
    ],
  },
  {
    tabTitle: 'Insurers',
    content: [
      {
        img: Unore,
        partnerName: 'Uno Re',
        type: 'Insurers',
        ctaLink: 'https://bandprotocol.com/',
        description:
          'Together, PolkaCover and UnoRe will transform the decentralized ecosystem and provide insurance users a safety net on an unprecedented scale. Uno Re will provide PolkaCover with excess loss cover.',
      },
      {
        img: Insurance971,
        partnerName: '971 Insurance',
        type: 'Insurers',
        ctaLink: 'http://www.971insurance.ae/',
        description:
          '971 Insurance will support PolkaCover by providing the ground regulations needed to distribute regulated insurance products. Their panel will offer regular covers and tailor-made risk covers based on PolkaCover requirements. This collaboration will also enable seamless distribution of traditional and crypto insurance to the global audience on one platform.',
      },
      {
        img: PolkaInsure,
        partnerName: 'Polka Insure',
        type: 'Insurers',
        ctaLink: 'https://polkainsure.finance',
        description:
          'PolkaCover along with PolkaInsure will provide hack cover, wallet exchange hack cover, smart contract cover and security against price fluctuations to the users of both the marketplaces.',
      },
      {
        img: NsureNetwork,
        partnerName: 'Nsure network',
        type: 'Insurers',
        ctaLink: 'https://nsure.network/#/home',
        description:
          'With this collaboration, Nsure Network will expand PolkaCover’s market place by adding its unique variety of insurance products and insurance against common compromises in the crypto space.',
      },
      {
        img: CoverProtocol,
        partnerName: 'Cover Protocol',
        type: 'Insurers',
        ctaLink: 'https://www.coverprotocol.com/',
        description:
          'As a part of this integration, PolkaCover will be featuring their smart contract and platform covers on our marketplace. We are building an insurance marketplace to which Cover Protocol’s unique products will offer a much-needed layer of protection.',
      },
    ],
  },
  {
    tabTitle: 'Staking',
    content: [
      {
        img: FerrumNetwork,
        partnerName: 'Ferrum Network',
        type: 'Staking',
        ctaLink: 'https://ferrum.network/',
        description:
          'This integration will allow early buyers of CVR tokens to lock their tokens and earn high yields based on the length of time staked',
      },
      {
        img: UniFarm,
        partnerName: 'UniFarm ',
        type: 'Staking',
        ctaLink: 'https://unifarm.co/',
        description:
          'As part of the collaboration, users will be able to stake $CVR tokens alongside three other tokens included in the staking pool. Users will be able to stake the native tokens of each project respectively and be rewarded.',
      },
    ],
  },
  {
    tabTitle: 'Exchange',
    content: [
      {
        img: Hoo,
        partnerName: 'HOO',
        type: 'Exchange',
        ctaLink: 'https://hoo.com',
        description:
          'Hoo is known to be the safest, stable and the fastest blockchain asset servicing platform where our native token $CVR is now trading.',
      },
      {
        img: Bilaxy,
        partnerName: 'Bilaxy exchange',
        type: 'Exchange',
        ctaLink: 'https://bilaxy.com/',
        description:
          "The World's Leading Crypto Asset Trading Platform where our native token $CVR is now trading.",
      },
      {
        img: Uniswap,
        partnerName: 'UniSwap',
        type: 'Exchange',
        ctaLink: 'https://uniswap.org',
        description:
          'Uniswap is a decentralized protocol for automated liquidity provision on Ethereum where our native token $CVR is now trading.',
      },
    ],
  },
  {
    tabTitle: 'Payment Gateway',
    content: [
      {
        img: CollateralDefi,
        partnerName: 'Collateral DeFi',
        type: 'Payment Gateway',
        ctaLink: 'https://www.collateraldefi.io',
        description:
          'PolkaCover has integrated with the multi-chain Polkadot network Collateral Pay to bridge the DeFi-to-Fiat gap. PolkaCover will use Collateral Pay as a Payment Gateway to facilitate all kinds of transactions on the insurance products within the platform.',
      },
      {
        img: TransakFinance,
        partnerName: 'Transak Finance',
        type: 'Payment Gateway',
        ctaLink: 'https://transak.com/',
        description:
          'This alliance will allow users on the PolkaCover platform to be able to buy policies without having to go through multiple exchanges. The users will be able to buy CVR or our policy through fiat bank transfer or card payment at zero gas fees.',
      },
    ],
  },
  {
    tabTitle: 'Audit',
    content: [
      {
        img: Hacken,
        partnerName: 'Hacken',
        type: 'Audit',
        ctaLink: 'https://hacken.io',
        description:
          'The audit completed by Hacken was cleared from any risks or vulnerabilities in our smart contract which helped us strengthen the trust of our users and community.',
      },
    ],
  },
  {
    tabTitle: 'Marketing',
    content: [
      {
        img: VitorServices,
        partnerName: 'Vitor Services',
        type: 'Marketing',
        ctaLink: 'https://vitor-services.company',
        description:
          'With this integration, PolkaCover utilizes marketing services provided by Vitor’s powerful blockchain marketing technology.',
      },
      {
        img: Innovion,
        partnerName: 'Innovion',
        type: 'Marketing',
        ctaLink: 'https://innovion.co/',
        description:
          'PolkaCover uses Innovion’s prestigious reputation with a unique approach to marketing.',
      },
      {
        img: DuckDao,
        partnerName: 'DuckDAO',
        type: 'Marketing',
        ctaLink: 'https://duckdao.io/',
        description:
          'PolkaCover collaborates with DuckDAO to build Crypto, DeFi & NFT Insurance Adoption. Together, we work towards bringing out the next-generation insurance products and marketplace to the mass market within the crypto ecosystem.',
      },
    ],
  },
];

const Partner = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="text-32 text-partner-page-title font-Montserrat font-semibold text-center dark:text-white">
        Our Partners
      </div>

      <div className="pt-6 pb-8">
        <div className="sm:hidden">
          {/* <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full border-gray-300 rounded-md"
            defaultValue={tabs[activeTab]}
            onChange={({ target: { value } }) => setActiveTab(value)}
          >
            {tabs.map((tab, i) => (
              <option
                key={tab.tabTitle}
                value={i}
                className="text-dark-blue font-semibold dark:text-white"
              >
                {tab.tabTitle}
              </option>
            ))}
          </select> */}
        </div>
        <div className="overflow-x-scroll">
          <nav className="flex space-x-2 justify-center" aria-label="Tabs">
            {tabs.map((tab, i) => (
              <div
                key={tab.tabTitle}
                onClick={() => setActiveTab(i)}
                className={classNames(
                  activeTab === i
                    ? 'bg-active-tab-bg dark:text-tab-title'
                    : 'hover:bg-active-tab-bg',
                  'px-7 py-3 text-body-md rounded-xl cursor-pointer text-tab-title font-semibold dark:text-white',
                )}
                aria-current={activeTab === i ? 'page' : undefined}
              >
                {tab.tabTitle}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:gap-y-3 gap-y-5 gap-x-8 pb-14">
        {tabs[activeTab]?.content?.map((partner, i) => (
          <PartnerCard
            {...props}
            keys={i}
            img={partner.img}
            partnerName={partner.partnerName}
            description={partner.description}
            ctaLink={partner.ctaLink}
            key={uniqid()}
          />
        )) || (
          <div>
            <h6 className="text-center text-h6 ">Sorry! there is no content</h6>
          </div>
        )}
      </div>
    </>
  );
};

export default Partner;
