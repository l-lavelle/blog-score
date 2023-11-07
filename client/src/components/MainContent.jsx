import React from 'react';
import ArticlePreview from './ArticlePreview';

const MainContent = () => {
  return (
    <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <ArticlePreview />
      <ArticlePreview />
      <ArticlePreview />
    </main>
  );
};

export default MainContent;
