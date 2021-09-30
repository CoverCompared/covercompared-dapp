import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import uniqid from 'uniqid';
import PackageCard from '../components/common/PackageCard';
import MSOPlanCard from '../components/MSOPlanCard';
import { ThemeContext } from '../themeContext';
import { searchMSOList } from '../redux/actions/CoverList';
import Loading from '../components/common/Loading';
import ToolTip from '../components/common/ToolTip';

const MSOPlans = (props) => {
  const coverListData = useSelector((state) => state.coverList);
  const { loader, coverList, query, message, isFailed, page, totalPages } = coverListData;
  const [products, setProducts] = useState(coverList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMSOList());
  }, []);

  useEffect(() => {
    setProducts(coverList);
  }, [coverList]);

  const renderCards = () => {
    if (loader) {
      return (
        <div className="text-center">
          <Loading />
        </div>
      );
    }
    if (!loader && !products?.length) {
      return (
        <div className="mt-3 text-center dark:text-white text-h6 font-Montserrat font-medium w-full">
          Sorry! No results found
        </div>
      );
    }
    if (products?.length) {
      return (
        <div className="grid grid-cols-12 lg:grid-cols-12 xl:grid-col-12 gap-y-4 gap-x-5 md:gap-4 lg:gap-x-6 lg:gap-y-4 ">
          {products.map((obj) => (
            <MSOPlanCard key={uniqid()} {...obj} {...props} />
          ))}
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <div className="xl:px-48 sm:px-8">
        <div className="font-Inter text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text text-center">
          Cover Compares has partnered with{' '}
          <span className="font-semibold">World Class Doctors</span> - the MSO consortium which has
          operations in 57countries. And headquartered in the US.
        </div>
        <div className="mt-5 font-Inter text-post-body-text md:text-body-md text-body-sm dark:text-subtitle-dark-text text-center">
          The World Class Doctors -MSO consortium has 25 years medical second opinion (MSO)
          experience and provides opinions through the foremost medical experts from a consortium of
          the top hospitals in the world, with cutting edge research and knowledge.
        </div>
        <div
          className="bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 bg-clip-text fill-transparent font-semibold md:text-body-md text-body-sm text-center mt-6"
          style={{ WebkitTextFillColor: 'transparent' }}
        >
          The tie up is with the institutions and not individual doctors.
        </div>
        {/* <div className="bg-gradient-to-r from-global-banner-gd-1 to-global-banner-gd-2 rounded-2xl">
          <div className="md:px-16 md:py-12 py-6 px-8 flex justify-center items-center">
            <div className="font-Montserrat text-white md:text-body-lg text-body-md text-center">
              <div>
                Cover Compares has partnered with World Class Doctors - the MSO consortium which has
                operations in 57countries. And headquartered in the US.
              </div>
              <div className="mt-3">
                The World Class Doctors -MSO consortium has 25 years medical second opinion (MSO)
                experience and provides opinions through the foremost medical experts from a
                consortium of the top hospitals in the world, with cutting edge research and
                knowledge.
              </div>
              <div className="mt-3 font-semibold">
                The tie up is with the institutions and not individual doctors.
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="xl:px-32 lg:px-24 mt-20">{renderCards()}</div>
    </>
  );
};
export default MSOPlans;
