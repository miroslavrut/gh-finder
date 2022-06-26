import React from 'react';

interface Props {}

const About = (props: Props) => {
  return (
    <div>
      <h1 className="text-6xl mb-4">Github Finder</h1>
      <p className="mb-4 text-2xl font-light">
        React app to search github profiles and see profile details
      </p>
    </div>
  );
};

export default About;
