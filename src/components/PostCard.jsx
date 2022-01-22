import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
  const { _id, slug, title, image, description } = props;
  return (
    <div key={title} className="md:col-span-4 col-span-6">
      <div className="space-y-4">
        <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-xl">
          <img loading="lazy" className="object-contain rounded-2xl" src={image} alt={title} />
        </div>

        <div className="space-y-1">
          <h3 className="font-Montserrat text-dark-blue font-semibold md:text-body-md text-body-sm dark:text-white truncate">
            {title}
          </h3>
          <div className="text-post-body-text md:text-body-md text-body-xs mt-2 font-Inter dark:text-subtitle-dark-text">
            <div className="md:flex hidden">
              {description ? `${description.substring(0, 70)}. . .` : ''}
            </div>
            <div className="md:hidden">
              {description ? `${description.substring(0, 32)}. . .` : ''}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <Link
            to={`blog/${slug}`}
            className="font-Montserrat text-dark-blue font-semibold md:text-body-md text-body-sm underline dark:text-white"
          >
            Read More...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
