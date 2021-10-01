import React, { useState, useEffect } from 'react';
import uniqueId from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import { searchBlogList } from '../redux/actions/CoverList';
import Loading from '../components/common/Loading';
import PostCard from '../components/PostCard';
import MobilePageTitle from '../components/common/MobilePageTitle';

const LearnMore = (props) => {
  const dispatch = useDispatch();
  const coverListData = useSelector((state) => state.coverList);
  const { loader, blogList, message, isFailed, page, totalPages } = coverListData;

  const [BlogList, setBlogList] = useState(blogList);

  useEffect(() => {
    if (blogList !== null) {
      setBlogList(blogList);
    }
  }, [BlogList]);

  useEffect(() => {
    const query = `/table?range=[0,9]`;
    dispatch(searchBlogList(query));
  }, []);

  const RenderBlogs = () => {
    if (loader) {
      return (
        <div className="text-center">
          <Loading />
        </div>
      );
    }

    if (!loader && !BlogList?.length) {
      return (
        <div className="mt-3 text-center dark:text-white text-h6 font-Montserrat font-medium">
          Sorry! Couldn&apos;t found Blogs.
        </div>
      );
    }

    if (BlogList) {
      return (
        <div className="grid grid-cols-12 gap-y-6 xl:gap-y-8 gap-x-6 xl:gap-x-8 lg:px-14 md:px-4 md:pb-20 pb-14 sm:px-0">
          {BlogList.map((blog) => (
            <PostCard {...props} key={uniqueId()} {...blog} />
          ))}
        </div>
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
