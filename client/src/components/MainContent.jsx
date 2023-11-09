import React from 'react';
import ArticlePreview from './ArticlePreview';

const MainContent = () => {
  // Simulate loading state
  const loading = true;

  // Create mock articles or an empty array if loading
  const articles = loading
    ? Array.from({ length: 5 }, (_, index) => ({
        title: 'Loading Article ' + (index + 1),
        content: 'Loading content...',
      }))
    : [];

  return (
    <div className="main-content">
      {articles.map((article, index) => (
        <ArticlePreview key={index} {...article} />
      ))}
    </div>
  );
};

export default MainContent;
