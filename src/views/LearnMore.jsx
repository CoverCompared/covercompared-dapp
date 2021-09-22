import React from 'react';
import PostCard from '../components/PostCard';
import MobilePageTitle from '../components/common/MobilePageTitle';

const postCards = [
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
  {
    image: 'https://via.placeholder.com/1000',
    title: 'Charles Loeb: The Black Reporter Who Exposed an Atomic Bomb Lie',
    body: 'Lorem ipsum dolor sit amet, adipisc dolor sit amet.',
    ctaLink: '#',
  },
];

const LearnMore = (props) => {
  return (
    <>
      <MobilePageTitle title="Learn More" />
      <div className="grid grid-cols-12 gap-y-6 gap-x-6 xl:gap-y-8 xl:gap-x-8 md:grid-cols-12 lg:grid-cols-12 lg:px-14 md:pb-40 pb-0">
        {postCards.map(({ image, title, body, ctaLink }) => (
          <PostCard
            {...props}
            key={title}
            image={image}
            title={title}
            body={body}
            ctaLink={ctaLink}
          />
        ))}
      </div>
    </>
  );
};
export default LearnMore;
