import React from 'react';

const Home = React.lazy(() => import('../views/Home'));
const LearnMore = React.lazy(() => import('../views/LearnMore'));
const Subscribe = React.lazy(() => import('../views/Subscribe'));
const Partners = React.lazy(() => import('../views/Partners'));
const AboutToken = React.lazy(() => import('../views/AboutToken'));
const ContactUs = React.lazy(() => import('../views/ContactUs'));
const DetailSearch = React.lazy(() => import('../views/DetailSearch'));
const AboutUs = React.lazy(() => import('../views/AboutUs'));
const Product = React.lazy(() => import('../views/Product'));
const MyInsurance = React.lazy(() => import('../views/MyInsurance'));
const SubmitReview = React.lazy(() => import('../views/SubmitReview'));
const MsoPackages = React.lazy(() => import('../views/MsoPackages'));
const MsoProducts = React.lazy(() => import('../views/MsoProducts'));
const Blog = React.lazy(() => import('../views/Blog'));
const ErrorPage = React.lazy(() => import('../views/ErrorPage'));

const routes = [
  {
    path: '/',
    pageName: 'Home',
    exact: true,
    withSidebar: true,
    component: Home,
    title: 'Motto of the Company',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel semper blandit euismodvitae eleifend vitae eleifend massa imperdiet.',
    bgImg: 'md:bg-HomePageBg',
    mobileBgImg: 'bg-HomeMobileBg',
    bgImgClass: 'bg-100% bg-no-repeat bg-cover',
  },
  {
    path: '/learn-more',
    exact: true,
    pageName: 'LearnMore',
    withSidebar: true,
    component: LearnMore,
    title: 'Learn More',
    bgImg: 'md:bg-learnMoreBg',
    mobileBgImg: 'bg-LearnMoreMobileBg',
    bgImgClass: 'bg-100% bg-no-repeat',
  },
  {
    path: '/subscribe',
    exact: true,
    pageName: 'Subscribe',
    withSidebar: true,
    component: Subscribe,
    title: 'Subscribe',
    bgImg: 'md:bg-commonSectionBg',
    mobileBgImg: 'bg-Mobile404Bg',
    bgImgClass: 'bg-100% bg-no-repeat bg-bottom',
  },
  {
    path: '/partners',
    exact: true,
    pageName: 'Partners',
    withSidebar: true,
    component: Partners,
    title: 'Partners',
    bgImg: 'md:bg-partnersBg',
    mobileBgImg: 'bg-LearnMoreMobileBg',
    bgImgClass: 'bg-100% bg-no-repeat bg-center',
  },
  {
    path: '/about-token',
    exact: true,
    pageName: 'About Token',
    withSidebar: true,
    component: AboutToken,
    title: 'About the Polkacover Token',
    bgImg: 'md:bg-aboutTokenBg',
    mobileBgImg: 'bg-AboutTokenMobileBg',
    bgImgClass: 'bg-100% bg-no-repeat',
  },
  {
    path: '/contact-us',
    exact: true,
    pageName: 'Contact Us',
    withSidebar: true,
    component: ContactUs,
    title: 'Contact Us',
    bgImg: 'md:bg-commonSectionBg',
    mobileBgImg: 'bg-ContactUsMobileBg',
    bgImgClass: 'bg-100% bg-no-repeat bg-bottom',
  },
  {
    path: '/product/:type',
    exact: true,
    pageName: 'Product',
    withSidebar: false,
    component: Product,
    title: '',
    bgImg: 'md:bg-productBg',
    mobileBgImg: 'bg-productPageBg',
    bgImgClass: 'bg-100% bg-no-repeat',
  },
  {
    path: '/search/:card',
    exact: true,
    pageName: 'Product details Search',
    withSidebar: false,
    component: DetailSearch,
    title: '',
    bgImg: 'md:bg-packagePageBg',
    mobileBgImg: 'bg-Mobile404Bg',
    bgImgClass: 'bg-fixed bg-center bg-100% bg-no-repeat',
  },
  {
    path: '/about-us',
    exact: true,
    pageName: 'AboutUs',
    withSidebar: true,
    component: AboutUs,
    title: 'About Us',
    bgImg: 'md:bg-HomePageBg',
    mobileBgImg: 'bg-HomeMobileBg',
    bgImgClass: 'bg-100% bg-no-repeat bg-cover',
  },
  {
    path: '/my-insurance',
    exact: true,
    pageName: 'MyInsurance',
    withSidebar: true,
    component: MyInsurance,
    title: 'My Insurance',
    bgImg: 'md:bg-commonSectionBg',
    mobileBgImg: 'bg-Mobile404Bg',
    bgImgClass: 'bg-100% bg-no-repeat bg-bottom',
  },
  {
    path: '/submit-review',
    exact: true,
    pageName: 'Submit Review',
    withSidebar: true,
    component: SubmitReview,
    title: 'Submit Review',
    bgImg: 'md:bg-commonSectionBg',
    mobileBgImg: 'bg-submitReviewBg',
    bgImgClass: 'bg-fixed bg-100% bg-no-repeat bg-bottom',
  },
  {
    path: '/mso-packages',
    pageName: 'MSOProduct',
    withSidebar: false,
    component: MsoPackages,
    title: '',
    bgImg: 'md:bg-packagePageBg',
    bgImgClass: 'bg-100% bg-no-repeat bg-bottom',
  },
  {
    path: '/mso-product',
    exact: true,
    pageName: 'MSO Product',
    withSidebar: false,
    component: MsoProducts,
    title: '',
    bgImg: 'md:bg-productBg',
    bgImgClass: 'bg-100% bg-no-repeat',
  },
  {
    path: '/blog',
    exact: true,
    pageName: 'Blog',
    withSidebar: true,
    component: Blog,
    title: 'Learn More',
    bgImg: 'md:bg-partnersBg',
    mobileBgImg: 'bg-LearnMoreMobileBg',
    bgImgClass: 'bg-100% bg-no-repeat bg-center',
  },
  {
    path: '',
    pageName: 'Error',
    withSidebar: true,
    component: ErrorPage,
    title: '404',
    bgImg: 'md:bg-commonSectionBg',
    mobileBgImg: 'bg-Mobile404Bg',
    bgImgClass: 'bg-100% bg-no-repeat bg-bottom',
  },
];

export default routes;
