import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import uniqid from 'uniqid';
import InfiniteScroll from 'react-infinite-scroll-component';
import PackageCard from '../components/common/PackageCard';
import SmallPackageCard from '../components/common/SmallPackageCard';
import MSOPlanCard from '../components/MSOPlanCard';
import MSOSmallPackageCard from '../components/MSOSmallPackageCard';
import ChangeViewIcon from '../assets/img/view-change-icon.svg';
import MobileFilterIcon from '../assets/icons/mobile-filter.svg';
import MobileFilterWhiteIcon from '../assets/dark-icons/mobile-filter-white.svg';
import ChangeViewIconWhite from '../assets/dark-icons/view-change-icon.svg';
import SearchBar from '../components/common/SearchBar';
import { ThemeContext } from '../themeContext';
import { searchMSOList } from '../redux/actions/CoverList';
import { toggleFilters } from '../redux/actions/AppActions';
import Loading from '../components/common/Loading';
import FiltersSection from '../components/FiltersSection';
import ToolTip from '../components/common/ToolTip';

const MSOPlans = (props) => {
  const coverListData = useSelector((state) => state.coverList);
  const { loader, coverList, query, message, isFailed, page, totalPages } = coverListData;
  const [products, setProducts] = useState(coverList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMSOList());
  }, []);

  return (
    <>
      <div className="xl:px-48 md:mb-8 mb-4 sm:px-8">
        <div className="bg-gradient-to-r from-global-banner-gd-1 to-global-banner-gd-2 rounded-2xl">
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
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6 px-36 mt-16 mb-16">
        {products.map((obj) => (
          <MSOPlanCard key={uniqid()} {...obj} {...props} />
        ))}
      </div>
    </>
  );
};
export default MSOPlans;
