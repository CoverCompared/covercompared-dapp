import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Markup } from 'interweave';
import { useDispatch, useSelector } from 'react-redux';
import { logEvent } from 'firebase/analytics';

import { analytics } from '../config/firebase';
import { searchBlog } from '../redux/actions/CoverList';
import Loading from '../components/common/Loading';
import { socialMediaLinks } from '../functions/data';

const Blog = () => {
  const { blogPage } = useParams();
  const dispatch = useDispatch();
  const coverListData = useSelector((state) => state.coverList);
  const { loader, blog, message, isFailed, page, totalPages } = coverListData;

  const [blogTitle, setBlogTitle] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogSlug, setBlogSlug] = useState('');

  useEffect(() => {
    if (blog !== null) {
      setBlogTitle(blog.title);
      setBlogImage(blog.image);
      setBlogContent(blog.content);
      setBlogSlug(blog.slug);
      logEvent(analytics, 'View - Single Blog', { blogSlug: blog.slug });
    }
  }, [blog]);

  useEffect(() => {
    const query = `show/${blogPage}`;
    dispatch(searchBlog(query));
  }, []);

  const renderBlog = () => {
    if (loader) {
      return (
        <div className="text-center">
          <Loading />
        </div>
      );
    }
    if (!loader && !blog) {
      return (
        <div className="mt-3 text-center dark:text-white text-h6 font-Montserrat font-medium">
          Sorry! Couldn&apos;t found Blogs.
        </div>
      );
    }
    if (blog) {
      return (
        <div className="md:px-20">
          <div className="text-center w-full">
            <img
              loading="lazy"
              src={blogImage}
              alt={blogTitle}
              className="md:h-88 rounded-2xl mx-auto"
            />
          </div>
          <div className="font-Montserrat md:text-h2 text-h4 text-dark-blue font-semibold dark:text-white mt-10 mb-6">
            {blogTitle}
          </div>
          <div className="font-Inter text-post-body-text text-body-md dark:text-subtitle-dark-text mb-5">
            <Markup content={blogContent} />
          </div>
          <hr />

          <div className="flex mb-2 mt-3">
            {socialMediaLinks.map((item, i) => (
              <a key={i} href={item.href} target="_blank" rel="noreferrer" className="mx-1.5">
                <div className="rounded-full border p-1 h-8 w-8 hover:bg-bluegradient flex items-center justify-center">
                  <img loading="lazy" src={item.icon} alt={item.name} className="h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <div className="md:px-20">{renderBlog()}</div>
    </>
  );
};
export default Blog;
