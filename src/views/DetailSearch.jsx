import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import ReactTooltip from 'react-tooltip';
import uniqid from 'uniqid';
import InfiniteScroll from 'react-infinite-scroll-component';
import PackageCard from '../components/common/PackageCard';
import SmallPackageCard from '../components/common/SmallPackageCard';
import MSOPackageCard from '../components/MSOPackageCard';
import MSOSmallPackageCard from '../components/MSOSmallPackageCard';
import ChangeViewIcon from '../assets/img/view-change-icon.svg';
import MobileFilterIcon from '../assets/icons/mobile-filter.svg';
import MobileFilterWhiteIcon from '../assets/dark-icons/mobile-filter-white.svg';
import ChangeViewIconWhite from '../assets/dark-icons/view-change-icon.svg';
import SearchBar from '../components/common/SearchBar';
import { ThemeContext } from '../themeContext';
import { searchCoverList, fetchMoreCovers, searchMSOList } from '../redux/actions/CoverList';
import { toggleFilters } from '../redux/actions/AppActions';
import Loading from '../components/common/Loading';
import FiltersSection from '../components/FiltersSection';

const DetailSearch = (props) => {
  const { coverListData } = props;
  const { loader, coverList, query, message, isFailed, page, totalPages } = coverListData;
  // const urlSearchParams = new URLSearchParams(query || '');
  // const params = Object.fromEntries(urlSearchParams.entries()) || {};

  const { card } = useParams();
  const { theme } = useContext(ThemeContext);
  const [changeView, setChangeView] = useState(false);

  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(coverList || []);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const callOnMount = () => {
      if (card === 'smart-contract') setType('protocol');
      else if (card === 'crypto-exchange') setType('custodian');
      else setType('');
    };
    callOnMount();
  }, []);

  useEffect(() => {
    setProducts(coverList);
    if (page < totalPages) setHasMore(true);
    else setHasMore(false);
  }, [coverList, page, totalPages]);

  const debounceSearch = useCallback(
    debounce((text) => {
      if (card === 'smart-contract' || card === 'crypto-exchange') {
        props.searchCoverList(`?search=${text}&type=${type}`);
      } else if (card === 'mso') {
        props.searchMSOList(`?search=${text}`);
      }
    }, 500),
    [],
  );

  const onSearchChange = (value) => {
    setSearch(value);
    debounceSearch(value);
  };

  const fetchMoreData = () => {
    props.fetchMoreCovers(`?search=${search}&type=${type}&page=${page + 1}`);
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
            products.map((obj) => <PackageCard key={uniqid()} {...obj} {...props} />)
          ) : (
            <div className="grid grid-cols-12 lg:grid-cols-12 xl:grid-col-12 gap-y-4 gap-x-5 md:gap-4 lg:gap-x-6 lg:gap-y-4 ">
              {products.map((obj) => (
                <SmallPackageCard key={uniqid()} {...obj} {...props} />
              ))}
            </div>
          )}
        </InfiniteScroll>
      );
    }
    if (card === 'mso') {
      return !changeView ? (
        products.map((obj) => <MSOPackageCard key={uniqid()} {...obj} {...props} />)
      ) : (
        <div className="grid grid-cols-12 lg:grid-cols-12 xl:grid-col-12 gap-y-4 gap-x-5 md:gap-4 lg:gap-x-6 lg:gap-y-4 ">
          {products.map((obj) => (
            <MSOSmallPackageCard key={uniqid()} {...obj} {...props} />
          ))}
        </div>
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
        <div className="md:px-40 mb-7">
          <SearchBar {...props} {...{ search, setSearch: onSearchChange }} />
        </div>

        <div className="grid grid-cols-12 gap-x-0 lg:gap-x-12 md:px-12">
          <FiltersSection search={search} card={card} type={type} />

          <div className="md:col-span-9 col-span-12">
            <div className="flex justify-between items-center mb-4 pr-2">
              <div className="font-Montserrat text-body-md font-semibold text-dark-blue dark:text-white">
                Choose your Package
              </div>
              <div className="flex items-center">
                <div
                  data-for="search-tool-tip"
                  data-tip="Hello world"
                  data-iscapture="true"
                  className="bg-login-button-bg h-7 w-7 shadow-search-shadow rounded-full font-semibold font-Inter text-h6 text-login-button-text dark:text-white flex justify-center items-center mr-4 cursor-pointer"
                >
                  i
                </div>
                <ReactTooltip
                  id="search-tool-tip"
                  place="bottom"
                  effect="float"
                  border={false}
                  borderColor="none"
                  backgroundColor="linear-gradient(to right, #175186 , #7BC3E4)"
                />
                <button
                  type="button"
                  onClick={() => props.toggleFilters(true)}
                  className="focus:outline-none focus:ring-offset-0"
                >
                  <img
                    src={theme === 'light' ? MobileFilterIcon : MobileFilterWhiteIcon}
                    alt=""
                    className="md:hidden mr-4"
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

const mapStateToProps = ({ coverList }) => ({
  coverListData: coverList,
});

export default connect(mapStateToProps, {
  searchCoverList,
  searchMSOList,
  fetchMoreCovers,
  toggleFilters,
})(DetailSearch);
