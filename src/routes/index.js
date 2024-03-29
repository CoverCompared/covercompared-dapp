import React from 'react';

const Home = React.lazy(() => import('../views/Home'));
const LearnMore = React.lazy(() => import('../views/LearnMore'));
const Subscribe = React.lazy(() => import('../views/Subscribe'));
const Partners = React.lazy(() => import('../views/Partners'));
const AboutToken = React.lazy(() => import('../views/AboutToken'));
const ContactUs = React.lazy(() => import('../views/ContactUs'));
const DetailSearch = React.lazy(() => import('../views/DetailSearch'));
const AboutUs = React.lazy(() => import('../views/AboutUs'));
const CoverAndExchangeProduct = React.lazy(() => import('../views/CoverAndExchangeProduct'));
const MyAccount = React.lazy(() => import('../views/MyAccount'));
const SubmitReview = React.lazy(() => import('../views/SubmitReview'));
const Blog = React.lazy(() => import('../views/Blog'));
const ErrorPage = React.lazy(() => import('../views/ErrorPage'));
const MSOPlans = React.lazy(() => import('../views/MSOPlans'));
const DeviceProduct = React.lazy(() => import('../views/DeviceProduct'));
const FAQ = React.lazy(() => import('../views/FAQ'));
const Staking = React.lazy(() => import('../views/Staking'));

const routes = [
  {
    path: '/',
    pageName: 'Home',
    exact: true,
    withSidebar: true,
    component: Home,
    showBuyButton: true,
    title: '',
    subtitle: '',
    bgImg: 'md:bg-HomePageBg',
    mobileBgImg: 'bg-HomeMobileBg',
    bgImgClass: 'bg-100% bg-no-repeat bg-cover',
  },
];

// const routes = [
//   {
//     path: '/',
//     pageName: 'Home',
//     exact: true,
//     withSidebar: true,
//     component: Home,
//     showBuyButton: true,
//     title: '',
//     subtitle: '',
//     bgImg: 'md:bg-HomePageBg',
//     mobileBgImg: 'bg-HomeMobileBg',
//     bgImgClass: 'bg-100% bg-no-repeat bg-cover',
//   },
//   {
//     path: '/subscribe',
//     exact: true,
//     pageName: 'Subscribe',
//     withSidebar: true,
//     component: Subscribe,
//     title: 'Subscribe',
//     bgImg: 'md:bg-commonSectionBg',
//     mobileBgImg: 'bg-Mobile404Bg',
//     bgImgClass: 'bg-100% bg-no-repeat bg-bottom',
//   },
//   {
//     path: '/partners',
//     exact: true,
//     pageName: 'Partners',
//     withSidebar: true,
//     component: Partners,
//     title: 'Partners',
//     bgImg: 'md:bg-partnersBg',
//     mobileBgImg: 'bg-LearnMoreMobileBg',
//     bgImgClass: 'bg-100% bg-no-repeat bg-center',
//   },
//   {
//     path: '/about-token',
//     exact: true,
//     pageName: 'About Token',
//     withSidebar: true,
//     component: AboutToken,
//     title: 'About $CVR Token',
//     bgImg: 'md:bg-aboutTokenBg',
//     mobileBgImg: 'bg-AboutTokenMobileBg',
//     bgImgClass: 'bg-100% bg-no-repeat',
//   },
//   {
//     path: '/FAQ',
//     exact: true,
//     pageName: 'FAQ',
//     withSidebar: true,
//     component: FAQ,
//     title: 'FAQ',
//     bgImg: 'md:bg-packagePageBg',
//     mobileBgImg: 'bg-Mobile404Bg',
//     bgImgClass: 'bg-fixed bg-center bg-100% bg-no-repeat',
//   },
//   {
//     path: '/contact-us',
//     exact: true,
//     pageName: 'Contact Us',
//     withSidebar: true,
//     component: ContactUs,
//     title: 'Contact Us',
//     bgImg: 'md:bg-commonSectionBg',
//     mobileBgImg: 'bg-ContactUsMobileBg',
//     bgImgClass: 'bg-100% bg-no-repeat bg-bottom',
//   },
//   {
//     path: '/product/:type',
//     exact: true,
//     pageName: 'Product',
//     withSidebar: false,
//     component: CoverAndExchangeProduct,
//     title: '',
//     bgImg: 'md:bg-productBg',
//     mobileBgImg: 'bg-productPageBg',
//     bgImgClass: 'bg-100% bg-no-repeat',
//   },
//   {
//     path: '/device-product',
//     exact: true,
//     pageName: 'Product',
//     withSidebar: false,
//     component: DeviceProduct,
//     title: '',
//     bgImg: 'md:bg-productBg',
//     mobileBgImg: 'bg-productPageBg',
//     bgImgClass: 'bg-100% bg-no-repeat',
//   },
//   {
//     path: '/search/:card',
//     exact: true,
//     pageName: 'Product details Search',
//     withSidebar: false,
//     component: DetailSearch,
//     title: '',
//     bgImg: 'md:bg-packagePageBg',
//     mobileBgImg: 'bg-Mobile404Bg',
//     bgImgClass: 'bg-fixed bg-center bg-100% bg-no-repeat',
//   },
//   {
//     path: '/mso-plans',
//     exact: true,
//     pageName: 'Product details Search',
//     withSidebar: false,
//     showBuyButton: false,
//     component: MSOPlans,
//     title: '',
//     bgImg: 'md:bg-packagePageBg',
//     mobileBgImg: 'bg-Mobile404Bg',
//     bgImgClass: 'bg-fixed bg-center bg-100% bg-no-repeat',
//   },
//   {
//     path: '/about-us',
//     exact: true,
//     pageName: 'AboutUs',
//     withSidebar: true,
//     component: AboutUs,
//     title: 'About Us',
//     bgImg: 'md:bg-AboutUsBg',
//     mobileBgImg: 'bg-HomeMobileBg',
//     bgImgClass: 'bg-100% bg-no-repeat bg-cover',
//   },
//   {
//     path: '/my-account',
//     exact: true,
//     pageName: 'MyAccount',
//     withSidebar: true,
//     component: MyAccount,
//     title: 'My Account',
//     bgImg: 'md:bg-commonSectionBg',
//     mobileBgImg: 'bg-Mobile404Bg',
//     bgImgClass: 'bg-100% bg-no-repeat bg-bottom',
//   },
//   {
//     path: '/submit-review/:id',
//     exact: true,
//     pageName: 'Submit Review',
//     withSidebar: true,
//     component: SubmitReview,
//     title: 'Submit Review',
//     bgImg: 'md:bg-commonSectionBg',
//     mobileBgImg: 'bg-submitReviewBg',
//     bgImgClass: 'bg-fixed bg-100% bg-no-repeat bg-bottom',
//   },
//   {
//     path: '/blogs',
//     exact: true,
//     pageName: 'Blogs',
//     withSidebar: true,
//     component: LearnMore,
//     title: 'Blogs',
//     bgImg: 'md:bg-packagePageBg',
//     mobileBgImg: 'bg-LearnMoreMobileBg',
//     bgImgClass: 'bg-100% bg-no-repeat md:bg-fixed bg-center',
//   },
//   {
//     path: '/blog/:blogPage',
//     exact: true,
//     pageName: 'Blog',
//     withSidebar: true,
//     component: Blog,
//     title: 'Learn More',
//     bgImg: 'md:bg-partnersBg',
//     mobileBgImg: 'bg-LearnMoreMobileBg',
//     bgImgClass: 'bg-100% bg-no-repeat bg-center',
//   },
//   {
//     path: '/staking',
//     exact: true,
//     pageName: 'Staking',
//     withSidebar: true,
//     component: Staking,
//     title: 'Staking',
//     bgImg: 'md:bg-partnersBg',
//     mobileBgImg: 'bg-LearnMoreMobileBg',
//     bgImgClass: 'bg-100% bg-no-repeat bg-center',
//   },
//   {
//     path: '',
//     pageName: 'Error',
//     withSidebar: true,
//     component: ErrorPage,
//     title: '404',
//     bgImg: 'md:bg-commonSectionBg',
//     mobileBgImg: 'bg-Mobile404Bg',
//     bgImgClass: 'bg-100% bg-no-repeat bg-bottom',
//   },
// ];

export default routes;
