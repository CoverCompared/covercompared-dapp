import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import uniqid from 'uniqid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { logEvent } from 'firebase/analytics';

import { analytics } from '../config/firebase';
import PackageCard from '../components/common/PackageCard';
import SmallPackageCard from '../components/common/SmallPackageCard';

import ChangeViewIcon from '../assets/img/view-change-icon.svg';
import MobileFilterIcon from '../assets/icons/mobile-filter.svg';
import MobileFilterWhiteIcon from '../assets/dark-icons/mobile-filter-white.svg';
import ChangeViewIconWhite from '../assets/dark-icons/view-change-icon.svg';
import SearchBar from '../components/common/SearchBar';
import { ThemeContext } from '../themeContext';
import { searchCoverList, fetchMoreCovers } from '../redux/actions/CoverList';
import { searchMSOList } from '../redux/actions/MsoInsurance';
import { toggleFilters } from '../redux/actions/AppActions';
import Loading from '../components/common/Loading';
import FiltersSection from '../components/FiltersSection';
import ToolTip from '../components/common/ToolTip';

const DetailSearch = (props) => {
  const dispatch = useDispatch();
  const coverListData = useSelector((state) => state.coverList);

  const { loader, coverList, query, message, isFailed, page, totalPages } = coverListData;
  // const urlSearchParams = new URLSearchParams(query || '');
  // const params = Object.fromEntries(urlSearchParams.entries()) || {};

  const { card } = useParams();
  const { theme } = useContext(ThemeContext);
  const [changeView, setChangeView] = useState(false);

  const [search, setSearch] = useState('');
  const [filtersQuery, setFiltersQuery] = useState('');
  const [products, setProducts] = useState(coverList || []);
  const [hasMore, setHasMore] = useState(true);

  let type;
  if (card === 'smart-contract') type = 'protocol,token';
  else if (card === 'crypto-exchange') type = 'custodian';
  else type = '';

  useEffect(() => {
    if (card === 'smart-contract') logEvent(analytics, 'View - Smart Contract Cover');
    else if (card === 'crypto-exchange') logEvent(analytics, 'View - Crypto Exchange');
  }, []);

  useEffect(() => {
    setProducts(coverList);
    if (page < totalPages) setHasMore(true);
    else setHasMore(false);
  }, [coverList, page, totalPages]);

  const debounceSearch = useCallback(
    debounce((text) => {
      if (card === 'smart-contract' || card === 'crypto-exchange') {
        dispatch(searchCoverList(`?search=${text}&type=${type}${filtersQuery}`));
      } else if (card === 'mso') {
        dispatch(searchMSOList(`?search=${text}${filtersQuery}`));
      }
    }, 500),
    [],
  );

  const onSearchChange = (value) => {
    setSearch(value);
    debounceSearch(value);
  };

  const fetchMoreData = () => {
    dispatch(fetchMoreCovers(`?search=${search}&type=${type}&page=${page + 1}${filtersQuery}`));
  };

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
        <div className="mt-3 text-center dark:text-white text-h6 font-Montserrat font-medium">
          Sorry! No results found
        </div>
      );
    }

    if ((card === 'smart-contract' || card === 'crypto-exchange') && products?.length) {
      return (
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={<></>}
          scrollThreshold={1}
        >
          {!changeView ? (
            products &&
            products.map((obj) => (
              <PackageCard key={uniqid()} {...obj} {...props} cardType={card} />
            ))
          ) : (
            <div className="grid grid-cols-12 lg:grid-cols-12 xl:grid-col-12 gap-y-4 gap-x-5 md:gap-4 lg:gap-x-6 lg:gap-y-4 ">
              {products &&
                products.map((obj) => (
                  <SmallPackageCard key={uniqid()} {...obj} {...props} cardType={card} />
                ))}
            </div>
          )}
        </InfiniteScroll>
      );
    }

    return <></>;
  };

  return (
    <>
      <div className="md:px-16">
        {/* <div className="font-Montserrat md:text-heading text-h4 font-semibold text-dark-blue text-center pb-6 dark:text-white">
          Search by address/protocol name
        </div> */}
        <div className="xl:px-40 md:px-14 mb-7">
          <SearchBar {...props} {...{ search, setSearch: onSearchChange }} />
        </div>

        <div className="grid grid-cols-12 gap-x-0 lg:gap-x-12 xl:px-12 sm:px-4">
          <FiltersSection
            search={search}
            card={card}
            type={type}
            setFiltersQuery={setFiltersQuery}
          />

          <div className="md:col-span-9 col-span-12">
            <div className="flex justify-between items-center mb-4 pr-2">
              <div className="font-Montserrat text-body-md font-semibold text-dark-blue dark:text-white">
                Choose your Package
              </div>
              <div className="flex items-center">
                {process.env.SHOW_UPCOMING_FEATURES_TO_CONFIRM && (
                  <>
                    <div
                      data-for="info-tool-tip"
                      data-tip="Hello World"
                      data-iscapture="true"
                      className="bg-login-button-bg dark:bg-white h-7 w-7 shadow-search-shadow rounded-full font-semibold font-Roboto text-h6 text-login-button-text dark:text-dark-blue flex justify-center items-center mr-4 cursor-pointer"
                    >
                      i
                    </div>
                    <ToolTip
                      ToolTipId="info-tool-tip"
                      bgColor="linear-gradient(to right, #175186 , #7BC3E4)"
                      fontColor="#FFF"
                    />
                  </>
                )}

                <button
                  type="button"
                  onClick={() => dispatch(toggleFilters(true))}
                  className="focus:outline-none focus:ring-offset-0 md:mr-4"
                >
                  <img
                    src={theme === 'light' ? MobileFilterIcon : MobileFilterWhiteIcon}
                    alt=""
                    className="md:hidden"
                  />
                </button>
                <div
                  onClick={() => setChangeView(!changeView)}
                  className="cursor-pointer hidden lg:block"
                >
                  <img
                    src={theme === 'light' ? ChangeViewIcon : ChangeViewIconWhite}
                    alt="Change View"
                    className="h-6"
                  />
                </div>
              </div>
            </div>
            {renderCards()}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSearch;
