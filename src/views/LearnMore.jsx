import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import uniqueId from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import { logEvent } from 'firebase/analytics';

import { analytics } from '../config/firebase';
import { searchBlogList, fetchMoreBlogs } from '../redux/actions/CoverList';
import Loading from '../components/common/Loading';
import PostCard from '../components/PostCard';
import MobilePageTitle from '../components/common/MobilePageTitle';

const LearnMore = (props) => {
  const dispatch = useDispatch();
  const coverListData = useSelector((state) => state.coverList);
  const { loader, message, isFailed, page, totalPages } = coverListData;

  const [blogList, setBlogList] = useState(coverListData.blogList);
  const [blogRange, setBlogRange] = useState(coverListData.blogRange);
  const [hasMore, setHasMore] = useState(false);
  const [lastBlogNumber, setLastBlogNumber] = useState(0);

  useEffect(() => {
    if (coverListData.blogList) {
      setBlogRange(coverListData.blogRange);
      setBlogList(coverListData.blogList);
      const range = coverListData.blogRange.split('/');
      const blogsMinMaxNumber = range[0].split('-');
      setLastBlogNumber(JSON.parse(blogsMinMaxNumber[1]));

      if (blogsMinMaxNumber[1] < range[1]) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [coverListData.blogList]);

  useEffect(() => {
    logEvent(analytics, 'View - Learn More');

    const query = `/table?range=[0,9]`;
    dispatch(searchBlogList(query));
  }, []);

  const fetchMoreBlog = () => {
    const query = `/table?range=[${lastBlogNumber},${lastBlogNumber + 9}]`;
    dispatch(fetchMoreBlogs(query));
  };

  const RenderBlogs = () => {
    if (loader) {
      return (
        <div className="text-center">
          <Loading />
        </div>
      );
    }

    if (!loader && !blogList?.length) {
      return (
        <div className="mt-3 text-center dark:text-white text-h6 font-Montserrat font-medium">
          Sorry! Couldn&apos;t found Blogs.
        </div>
      );
    }

    if (blogList) {
      return (
        <InfiniteScroll
          dataLength={blogList.length}
          next={fetchMoreBlog}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={<></>}
          scrollThreshold={1}
        >
          <div className="grid grid-cols-12 gap-y-6 xl:gap-y-8 gap-x-6 xl:gap-x-8 lg:px-14 md:px-4 md:pb-20 pb-14 sm:px-0">
            {blogList.map((blog) => (
              <PostCard {...props} key={uniqueId()} {...blog} />
            ))}
          </div>
        </InfiniteScroll>
      );
    }

    return <></>;
  };

  return (
    <>
      <MobilePageTitle title="Learn More" />
      {RenderBlogs()}
    </>
  );
};
export default LearnMore;
