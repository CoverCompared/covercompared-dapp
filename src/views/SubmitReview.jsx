import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import FormInput from '../components/FormInput';
import MobilePageTitle from '../components/common/MobilePageTitle';

const ContactUs = () => {
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [reviews, SetReviews] = useState('');
  const [rating, setRating] = useState(0);

  const isValid = () => {
    return !(name === '' || email === '' || reviews === '' || rating === '');
  };

  return (
    <>
      <MobilePageTitle title="Submit review" />
      <form className="md:pr-28 md:pl-6 md:mb-8 md:mt-6">
        <div className="grid grid-cols-12 gap-y-6 xl:gap-y-8 gap-x-6 xl:gap-x-8">
          <div className="relative col-span-12 md:col-span-6">
            <FormInput
              title="First Name"
              inputValue={name}
              setChange={SetName}
              inputPlaceholder="Enter your Name"
            />
          </div>
          <div className="relative col-span-12 md:col-span-6">
            <FormInput
              title="Email"
              inputValue={email}
              setChange={SetEmail}
              inputPlaceholder="Enter your Email"
            />
          </div>
        </div>

        <div className=" relative mt-6">
          <label className="font-Montserrat text-dark-blue font-h1 font-semibold dark:text-white">
            Reviews
          </label>
          <textarea
            onChange={(e) => SetReviews(e.target.value)}
            className="mt-3 py-2 px-4 h-32 rounded-lg appearance-none w-full border-1 border-light-gray-border focus:border-light-gray-border bg-promo-input-bg text-black placeholder-contact-input-dark-grey text-base focus:outline-none focus:ring-0 focus:border-0 focus:ring-shadow-none font-Montserrat font-semibold text-body-sm shadow-lg"
            placeholder="Reviews"
          />
        </div>

        <div className="relative mt-6">
          <div className="font-Montserrat text-dark-blue font-h1 font-semibold dark:text-white">
            Ratings
          </div>
          <div className="mt-4">
            <StarRatings
              rating={rating}
              value={rating}
              starEmptyColor="rgba(196, 196, 196, 1)"
              starRatedColor="rgba(254, 195, 45, 1)"
              starHoverColor="rgba(254, 195, 45, 1)"
              changeRating={(newRating) => setRating(newRating)}
              starDimension="36px"
              starSpacing="2px"
              numberOfStars={5}
              svgIconPath="M21.8912 16.092C21.5459 16.4267 21.3872 16.9107 21.4659 17.3854L22.6512 23.9454C22.7512 24.5014 22.5165 25.064 22.0512 25.3854C21.5952 25.7187 20.9885 25.7587 20.4912 25.492L14.5859 22.412C14.3805 22.3027 14.1525 22.244 13.9192 22.2374H13.5579C13.4325 22.256 13.3099 22.296 13.1979 22.3574L7.29118 25.452C6.99918 25.5987 6.66852 25.6507 6.34452 25.5987C5.55518 25.4494 5.02852 24.6974 5.15785 23.904L6.34452 17.344C6.42318 16.8654 6.26452 16.3787 5.91918 16.0387L1.10452 11.372C0.70185 10.9814 0.56185 10.3947 0.74585 9.86536C0.924517 9.33736 1.38052 8.95203 1.93118 8.86536L8.55785 7.90403C9.06185 7.85203 9.50452 7.54536 9.73118 7.09203L12.6512 1.10536C12.7205 0.972031 12.8099 0.849365 12.9179 0.745365L13.0378 0.652031C13.1005 0.582698 13.1725 0.525365 13.2525 0.478698L13.3979 0.425365L13.6245 0.332031H14.1858C14.6872 0.384031 15.1285 0.684031 15.3592 1.13203L18.3179 7.09203C18.5312 7.52803 18.9459 7.8307 19.4245 7.90403L26.0512 8.86536C26.6112 8.94536 27.0792 9.33203 27.2645 9.86536C27.4392 10.4 27.2885 10.9867 26.8779 11.372L21.8912 16.092Z"
              name="rating"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isValid()}
            className="py-3 px-8 mt-8 text-white font-Montserrat font-md rounded-2xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default ContactUs;
