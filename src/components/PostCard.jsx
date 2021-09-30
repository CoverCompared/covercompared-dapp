import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
  const { _id, slug, title, image, description } = props;
  return (
    <div key={title} className="col-span-6 sm:col-span-4">
      <div className="space-y-4">
        <div className="aspect-w-3 aspect-h-2">
          <img className="object-cover rounded-2xl" src={image} alt={title} />
        </div>

        <div className="space-y-1">
          <h3 className="font-Montserrat text-dark-blue font-semibold md:text-body-md text-body-sm dark:text-white truncate">
            {title}
          </h3>
          <p className="text-post-body-text md:text-body-md text-body-xs mt-2 font-Inter dark:text-subtitle-dark-text">
            {description ? `${description.substring(0, 70)}. . .` : ''}
          </p>
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
