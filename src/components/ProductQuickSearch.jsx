import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { connect, useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import uniqid from 'uniqid';
import SearchBar from './common/SearchBar';
import SearchedProductCard from './SearchedProductCard';
import { searchCoverList } from '../redux/actions/CoverList';
import Loading from './common/Loading';

// const products = [
//   {
//     image: 'https://via.placeholder.com/250',
//     name: 'Pick Name Here',
//     priceLabel: 'Starting From',
//     priceValue: '$300',
//     discount: '10',
//   },
//   {
//     image: 'https://via.placeholder.com/250',
//     name: 'Pick Name Here',
//     priceLabel: 'Starting From',
//     priceValue: '$300',
//     discount: '',
//   },
//   {
//     image: 'https://via.placeholder.com/250',
//     name: 'Pick Name Here',
//     priceLabel: 'Starting From',
//     priceValue: '$300',
//     discount: '20',
//   },
//   {
//     image: 'https://via.placeholder.com/250',
//     name: 'Pick Name Here',
//     priceLabel: 'Starting From',
//     priceValue: '$300',
//     discount: '',
//   },
// ];

const ProductQuickSearch = (props) => {
  const dispatch = useDispatch();
  const coverListData = useSelector((state) => state.coverList);

  const { loader, coverList, query, message, isFailed } = coverListData;

  const urlSearchParams = new URLSearchParams(query || '');
  const params = Object.fromEntries(urlSearchParams.entries()) || {};

  const history = useHistory();
  const [loading, setLoading] = useState(loader);
  const [search, setSearch] = useState(params?.search || '');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(loader);
  }, [loader]);

  useEffect(() => {
    setProducts(coverList?.list.slice(0, 4));
  }, [coverList?.list]);

  const handleViewAll = (e) => {
    if (e) e.preventDefault();
    history.push('/search/smart-contract');
  };

  const debounceSearch = useCallback(
    debounce((text) => dispatch(searchCoverList(`?search=${text}`), 500)),
    [],
  );

  const onSearchChange = (value) => {
    setSearch(value);
    debounceSearch(value);
  };

  const renderCards = () => {
    if (loading) {
      return (
        <div className="md:mt-4 mt-10">
          <div className="text-center">
            <Loading />
          </div>
        </div>
      );
    }

    if (!search && !loading && !products?.length) {
      return <></>;
    }

    if (search && !loading && !products?.length) {
      return (
        <div className="md:mt-4 mt-10">
          <div className="text-center">No results found</div>
        </div>
      );
    }

    return (
      <div className="md:mt-4 mt-10 grid grid-cols-1 gap-y-6 xl:gap-y-8 gap-x-6 xl:gap-x-8 md:grid-cols-2 lg:grid-cols-4">
        {products.map((m) => (
          <SearchedProductCard key={uniqid()} {...m} {...props} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <SearchBar
        {...props}
        {...{
          search,
          showSearchButton: true,
          setSearch: onSearchChange,
          handleSearch: handleViewAll,
        }}
      />
      {renderCards()}
    </div>
  );
};

export default ProductQuickSearch;
