import React from 'react';
import ArticlePreview from './ArticlePreview';

const MainContent = () => {
  const articles = [
    // Array here
  ];

  return (
    <div className="main-content">
      {articles.map((article, index) => (
        <ArticlePreview key={index} {...article} />
      ))}
    </div>
  );
};

export default MainContent;
