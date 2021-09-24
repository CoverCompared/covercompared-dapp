/* eslint-disable global-require */
module.exports = {
  purge: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    backgroundSize: {
      '90%': '100% 90%',
      '100%': '100% 100%',
    },
    extend: {
      fontFamily: {
        Inter: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        Montserrat: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        homeCardBg1: "url('./assets/bg-img/home-card-1.png')",
        homeCardBg2: "url('./assets/bg-img/home-card-2.png')",
        homeCardBg3: "url('./assets/bg-img/home-card-3.png')",
        homeCardBg4: "url('./assets/bg-img/home-card-4.png')",
        HomePageBg: "url('./assets/bg-img/home-page-bg.png')",
        cartCardBg: "url('./assets/bg-img/cart-card-bg.png')",
        cartPageBg: "url('./assets/bg-img/cart-page-bg.png')",
        packagePageBg: "url('./assets/bg-img/package-page-bg.png')",
        myInsurancePageBg: "url('./assets/bg-img/my-insurance-page-bg.png')",
        globalPolicyBg: "url('./assets/img/global-banner-bg.png')",
        aboutTokenTopBanner: "url('./assets/bg-img/about-token-top-banner.png')",
        subscribeBannerBg: "url('./assets/bg-img/subscribe-banner-bg.png')",
        commonSectionBg: "url('./assets/bg-img/common-secion-bg.png')",
        productBg: "url('./assets/bg-img/product-bg.png')",
        loginPopupBg: "url('./assets/bg-img/login-bg-popup.png')",
        learnMoreBg: "url('./assets/bg-img/learn-more-bg.png')",
        partnersBg: "url('./assets/bg-img/partners-bg.png')",
        aboutTokenBg: "url('./assets/bg-img/about-token-bg.png')",
        aboutUsBg: "url('./assets/bg-img/about-us-bg.png')",
        productBgDots: "url('./assets/bg-img/product-bg-dots.svg')",
        cartCardMobileBg: "url('./assets/bg-img/mobile-bg/cart-card-bg.png')",
        globalPolicyMobileBg: "url('./assets/bg-img/mobile-bg/global-banner-bg.png')",
        Mobile404Bg: "url('./assets/bg-img/mobile-bg/404-bg.png')",
        HomeMobileBg: "url('./assets/bg-img/mobile-bg/home-bg.png')",
        productPageBg: "url('./assets/bg-img/mobile-bg/product-page-bg.png')",
        submitReviewBg: "url('./assets/bg-img/mobile-bg/submit-review-bg.png')",
        AboutTokenMobileBg: "url('./assets/bg-img/mobile-bg/about-token-bg.png')",
        ContactUsMobileBg: "url('./assets/bg-img/mobile-bg/contact-us-bg.png')",
        LearnMoreMobileBg: "url('./assets/bg-img/mobile-bg/learn-more-bg.png')",
        mobileCartCardBg: "url('./assets/bg-img/mobile-bg/cart-card-bg.png')",
        additionalDetailsBg: "url('./assets/bg-img/addtional-details-bg.png')",
        additionalDetailsBg1: "url('./assets/bg-img/addtional-details-bg-1.png')",
        submitClaimBg: "url('./assets/bg-img/submit-claim-popup-bg.png')",
        formPopupBg: "url('./assets/bg-img/form-bg.png')",
        formPopupMobileBg: "url('./assets/bg-img/mobile-bg/form-popup-bg.png')",
        loginPopupMobileBg: "url('./assets/bg-img/mobile-bg/login-popup-bg.png')",
        submitClaimPopupBg: "url('./assets/bg-img/mobile-bg/submit-claim-popup-bg.png')",
      },
      colors: {
        'body-bg': '#FDFEFD',
        'body-dark-bg': '#141B25',
        'sidebar-dark-bg': '#182127',
        'sidebar-bg': '#64AECE',
        'sidebar-grey-bg': '#F9F9F9',
        'primary-gd-1': '#175186',
        'primary-gd-2': '#7BC3E4',
        'buy-button-gd-1': '#007993',
        'buy-button-gd-2': '#45EA9A',
        'menu-no-active': '#9AA2A9',
        'header-lead-text': '#9AA2A9',
        'login-button-bg': '#E2F1FF',
        'login-button-text': '#175186',
        'counter-card-text': '#4E6688',
        'post-body-text': '#3F495E',
        'feature-icon-bg': '#E5FFF2',
        'feature-icon-dark-bg': '#151F26',
        'dark-blue': '#011B41',
        'global-banner-gd-1': '#227599',
        'global-banner-gd-2': '#42DDC1',
        'dark-blue-1': '#042351',
        'light-green': '#2BB673',
        'contact-input-grey': '#D2D2D2',
        'contact-input-dark-grey': '#9AA2A9',
        'partner-page-title': '#1F0359',
        'tab-title': '#011B41',
        'active-tab-bg': '#E2F1FF',
        'light-gray-border': '#E2DBDB',
        'discount-bg': '#DEFBED',
        'discount-text': '#1BA65D',
        'promo-input-bg': '#F6F8F8',
        'discount-apply-btn-bg': '#D1D1D1',
        'discount-apply-btn-text': '#7C7C7C',
        'empty-star': '#C4C4C4',
        'subtitle-dark-text': '#CFCFCF',
        'featureCard-dark-bg': '#252E34',
        'product-input-bg-dark': '#2A3341',
        'wallet-dark-bg': '#3C444F',
        getCVRBg: '#205B8F',
        'popup-dark-bg': '#151B26',
        'short-review-text': '#130F26',
        'crypto-selected-dark-option': '#182229',
        'filter-blue': '#ABE2FB',
      },
      fontSize: {
        heading: '28px',
        h1: '26px',
        h2: '24px',
        h3: '22px',
        h4: '20px',
        h5: '18px',
        h6: '16px',
        'body-lg': '15px',
        'body-md': '14px',
        'body-sm': '13px',
        'body-xs': '12px',
        'body-2xs': '11px',
        'body-3xs': '10px',
        30: '30px',
        32: '32px',
        19: '19px',
        72: '72px',
        10: '10px',
      },
      boxShadow: {
        md: '0px 16px 48px rgba(4, 35, 81, 0.06)',
        insuranceCard: 'inset 6.35714px 8.9px 19.0714px rgba(255, 255, 255, 0.25)',
        buyInsurance: 'inset 5px 7px 15px rgba(255, 255, 255, 0.25)',
        'search-shadow': '0px 16px 48px 0px #0423510F',
        discountShadow: '0px 10px 56px rgba(15, 95, 52, 0.09)',
        addToCart: '0px 10px 56px rgba(15, 95, 52, 0.15);',
        'shadow-none': '0 0 0 rgba(0,0,0,0)',
        homeCardShadow: '0px 25.4286px 76.2857px rgba(4, 35, 81, 0.1)',
      },
      minWidth: {
        32: '8rem',
      },
      minHeight: {
        'full-3': 'calc(100% - 3rem)',
        'full-9': 'calc(100% - 9rem)',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['active'],
      backgroundColor: ['active'],
      opacity: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide'),
  ],
};
