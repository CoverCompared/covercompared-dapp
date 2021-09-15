import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import { getQuote } from '../redux/actions/CoverList';
import ReviewCard from '../components/ReviewCard';
import CoverBuyBox from '../components/CoverBuyBox';
import DeviceBuyBox from '../components/DeviceBuyBox';
import IdeaCard from '../assets/img/idea-icon.svg';
import LeftArrow from '../assets/img/nav-left-arrow.svg';
import RightArrow from '../assets/img/nav-right-arrow.svg';
import Filter from '../assets/img/Filter.svg';
import FilterWhite from '../assets/dark-icons/Filter.svg';
import ProductBgDots from '../assets/bg-img/product-bg-dots.svg';
import { ThemeContext } from '../themeContext';

const ReviewArr = [
  {
    name: 'Dakhs Joshi',
    image: 'https://via.placeholder.com/1000',
    rating: 5,
    uploaded: '2 days ago',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat nuncvarius porta.',
  },
  {
    name: 'Danish Ejaz',
    image: 'https://via.placeholder.com/1000',
    rating: 4,
    uploaded: '3 days ago',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat nuncvarius porta.',
  },
  {
    name: 'Erfan',
    image: 'https://via.placeholder.com/1000',
    rating: 3,
    uploaded: '2 days ago',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat nuncvarius porta.',
  },
  {
    name: 'Dakhs Joshi',
    image: 'https://via.placeholder.com/1000',
    rating: 4.8,
    uploaded: '2 days ago',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat nuncvarius porta.',
  },
  {
    name: 'Dakhs Joshi',
    image: 'https://via.placeholder.com/1000',
    rating: 4.2,
    uploaded: '2 days ago',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat nuncvarius porta.',
  },
  {
    name: 'Dakhs Joshi',
    image: 'https://via.placeholder.com/1000',
    rating: 3.8,
    uploaded: '2 days ago',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat nuncvarius porta.',
  },
];

const filterOption = ['High to low', 'Low to high', 'Other'];

const ReviewContainer = (props) => {
  const [allReview, setAllReview] = useState(false);
  const arr = allReview ? [...ReviewArr] : [...ReviewArr].slice(0, 2);

  return (
    <>
      {arr.map((obj) => (
        <ReviewCard {...props} key={uniqid()} {...obj} />
      ))}
      <div
        className="font-Inter font-medium text-body-md text-dark-blue dark:text-white hover:underline cursor-pointer mt-6 w-full underline"
        onClick={() => setAllReview(true)}
      >
        {!allReview && 'See all reviews'}
      </div>
      {allReview && (
        <div className="flex md:justify-end justify-center items-center md:mt-8 mt-12">
          <img src={LeftArrow} alt="Left" className="mr-6 cursor-pointer" />
          <img src={RightArrow} alt="Left" className="cursor-pointer" />
        </div>
      )}
    </>
  );
};

const InsuranceProduct = (props) => {
  const { type } = useParams();
  const { theme } = useContext(ThemeContext);
  const [filterSelect, setFilterSelect] = useState('');
  const [showFilterOption, setShowFilterOption] = useState(false);

  return (
    <>
      <div className="xl:px-32 lg:px-26">
        <div className="grid grid-cols-12 xl:gap-x-8 gap-y-6">
          <div className="md:col-span-4 col-span-12 flex justify-center">
            <div className="w-full h-64 rounded-2xl bg-gray-300 md:block hidden relative">
              <img
                src="https://via.placeholder.com/400x250.png"
                alt=""
                className="rounded-2xl h-full w-full relative z-10"
              />
              <img src={ProductBgDots} alt="" className="absolute -bottom-9 -right-7" />
            </div>
            <div className="md:hidden flex items-center">
              <img
                src="https://via.placeholder.com/400x250.png"
                alt=""
                className="rounded-2xl h-28 w-28"
              />
              <div className="font-semibold text-h4 text-dark-blue font-Montserrat dark:text-white md:hidden ml-8">
                Product Name Here
              </div>
            </div>
          </div>
          <div className="md:col-span-4 col-span-12 flex flex-col justify-center">
            <div className="font-semibold text-h2 text-dark-blue font-Montserrat mb-6 dark:text-white md:flex hidden">
              Product Name Here
            </div>
            <div className="font-Montserrat font-semibold text-black md:text-body-sm text-body-xs mb-5 dark:text-white">
              Details
            </div>
            <div className="flex justify-between items-center md:mb-3 mb-4">
              <div className="font-Montserrat font-semibold text-dark-blue md:text-body-sm text-body-xs dark:text-white">
                Address
              </div>
              <div className="font-Montserrat font-medium text-dark-blue md:text-body-sm text-body-xs ml-2 dark:text-white">
                Loreuam ac in amet, porta ac duis.
              </div>
            </div>
            <div className="flex justify-between items-center md:mb-3 mb-4">
              <div className="font-Montserrat font-semibold text-dark-blue md:text-body-sm text-body-xs dark:text-white">
                Capacity
              </div>
              <div className="font-Montserrat font-medium text-dark-blue md:text-body-sm text-body-xs ml-2 dark:text-white">
                Loreuam ac in amet, porta ac duis.
              </div>
            </div>
            <div className="flex justify-between items-center md:mb-3 mb-4">
              <div className="font-Montserrat font-semibold text-dark-blue md:text-body-sm text-body-xs dark:text-white">
                Provider
              </div>
              <div className="font-Montserrat font-medium text-dark-blue md:text-body-sm text-body-xs ml-2 dark:text-white">
                Loreuam ac in amet, porta ac duis.
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-Montserrat font-semibold text-dark-blue md:text-body-sm text-body-xs dark:text-white">
                Utilization
              </div>
              <div className="font-Montserrat font-medium text-dark-blue md:text-body-sm text-body-xs ml-2 dark:text-white">
                Loreuam ac in amet, porta ac duis.
              </div>
            </div>
          </div>
          <div className="md:col-span-4 col-span-12">
            {type === 'cover' && <CoverBuyBox {...props} />}
            {type === 'device' && <DeviceBuyBox {...props} />}
          </div>
        </div>

        <div className="grid grid-cols-12 xl:gap-x-12 gap-x-6 gap-y-10 md:mt-20 mt-6 mb-10">
          <div className="lg:col-span-7 xl:col-span-6 col-span-12 order-2 md:order-1">
            <div className="font-Montserrat font-semibold text-h5 text-dark-blue mb-2 dark:text-white">
              Description :
            </div>
            <div className="font-Inter font-normal text-counter-card-text text-body-md dark:text-subtitle-dark-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat
              nunc varius porta. Tincidunt vestibulum vivamus.
            </div>
            <div className="font-Montserrat font-semibold text-h5 text-dark-blue mb-2 md:mt-10 mt-8 dark:text-white">
              Additional Details :
            </div>
            <div className="font-Inter font-normal text-counter-card-text text-body-md dark:text-subtitle-dark-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat
              nunc varius porta. Tincidunt vestibulum vivamus sed facilisi ac urna quisque etiam
              bibendum. Sed aliquet at aliquam at nascetur hendrerit adipiscing.
            </div>
            <div className="font-Montserrat font-semibold text-h5 text-dark-blue mb-2 md:mt-10 mt-8 dark:text-white">
              Term & Condition :
            </div>
            <div className="font-Inter font-normal text-counter-card-text text-body-md dark:text-subtitle-dark-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices purus sit placerat
              nunc varius porta. Tincidunt vestibulum vivamus sed facilisi ac urna quisque etiam
              bibendum. Sed aliquet at aliquam at nascetur hendrerit adipiscing.
            </div>
          </div>
          <div className="xl:col-span-5 xl:col-start-8 lg:col-span-5 col-span-12 order-1 md:order-2">
            <div className="font-Montserrat font-semibold text-19 text-dark-blue mb-4 dark:text-white">
              Discount
            </div>
            <div className="w-full p-6 bg-discount-bg rounded-2xl">
              <div className="font-Inter text-h5 text-discount-text font-medium">
                Offer Details : 20% Loreum Dipsum
              </div>
              <div className="font-Inter text-body-md text-counter-card-text mt-4 mb-5 leading-6">
                Lorem ipsum dolor sit ametsectetur adipiscing elit. Ultrices purus sit placeranunc.
              </div>
              <button
                type="button"
                className="py-3 px-8 bg-discount-apply-btn-bg rounded-2xl outline-none border-0 text-discount-apply-btn-text font-Montserrat font-semibold text-body-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 xl:gap-x-12 gap-x-6 gap-y-10 md:mt-20 mt-12 mb-10">
          <div className="lg:col-span-6 xl:col-span-5 col-span-12 order-2 md:order-2">
            <div className="font-Montserrat font-semibold text-h5 text-dark-blue mb-4 dark:text-white">
              Review
            </div>
            <div className="font-Montserrat font-semibold text-72 text-dark-blue dark:text-white">
              4.5<span className="text-h5">/5.0</span>
            </div>
            <div className="flex justify-between items-center mb-8 w-full">
              <StarRatings
                rating={4.5}
                starDimension="36px"
                starSpacing="0px"
                starEmptyColor="rgba(196, 196, 196, 1)"
                starRatedColor="rgba(254, 195, 45, 1)"
                svgIconPath="M21.8912 16.092C21.5459 16.4267 21.3872 16.9107 21.4659 17.3854L22.6512 23.9454C22.7512 24.5014 22.5165 25.064 22.0512 25.3854C21.5952 25.7187 20.9885 25.7587 20.4912 25.492L14.5859 22.412C14.3805 22.3027 14.1525 22.244 13.9192 22.2374H13.5579C13.4325 22.256 13.3099 22.296 13.1979 22.3574L7.29118 25.452C6.99918 25.5987 6.66852 25.6507 6.34452 25.5987C5.55518 25.4494 5.02852 24.6974 5.15785 23.904L6.34452 17.344C6.42318 16.8654 6.26452 16.3787 5.91918 16.0387L1.10452 11.372C0.70185 10.9814 0.56185 10.3947 0.74585 9.86536C0.924517 9.33736 1.38052 8.95203 1.93118 8.86536L8.55785 7.90403C9.06185 7.85203 9.50452 7.54536 9.73118 7.09203L12.6512 1.10536C12.7205 0.972031 12.8099 0.849365 12.9179 0.745365L13.0378 0.652031C13.1005 0.582698 13.1725 0.525365 13.2525 0.478698L13.3979 0.425365L13.6245 0.332031H14.1858C14.6872 0.384031 15.1285 0.684031 15.3592 1.13203L18.3179 7.09203C18.5312 7.52803 18.9459 7.8307 19.4245 7.90403L26.0512 8.86536C26.6112 8.94536 27.0792 9.33203 27.2645 9.86536C27.4392 10.4 27.2885 10.9867 26.8779 11.372L21.8912 16.092Z"
              />
              <div className="mb-2 relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setShowFilterOption(true)}
                >
                  <img src={theme === 'light' ? Filter : FilterWhite} alt="" />
                  <div className="font-Montserrat font-semibold text-body-md ml-1 text-short-review-text dark:text-white">
                    {filterSelect === '' ? 'Short By' : filterSelect}
                  </div>
                </div>
                {showFilterOption && (
                  <div className="absolute -right-32 top-0 z-10">
                    <div className="py-1 px-3.5 rounded-xl bg-promo-input-bg cursor-pointer dark:bg-product-input-bg-dark">
                      {filterOption.map((option) => (
                        <div
                          key={uniqid()}
                          className="text-dark-blue my-2 font-Montserrat font-medium text-h6 dark:text-white"
                          onClick={() => {
                            setFilterSelect(option);
                            setShowFilterOption(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <ReviewContainer filterSelect={filterSelect} {...props} />
          </div>
          <div className="xl:col-span-5 xl:col-start-8 lg:col-span-4 col-span-12 order-1 md:order-2">
            <div className="py-10 px-8 flex-col flex justify-center items-center bg-discount-bg rounded-2xl">
              <img src={IdeaCard} alt="" />
              <div className="text-dark-blue text-19 font-Montserrat font-semibold text-center mt-4 mb-6">
                Did you know
              </div>
              <div className="font-Inter text-body-md text-counter-card-text leading-6 text-center">
                Lorem ipsum dolor sit ametsectetur adipiscing elit. Ultrices purus sit placeranunc.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ coverList, app }) => ({
  quote: coverList.quote,
  loader: coverList.loader,
  product: app.currentProduct,
});

export default connect(mapStateToProps, { getQuote })(InsuranceProduct);
