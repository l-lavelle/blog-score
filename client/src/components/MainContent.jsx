import ArticlePreview from './ArticlePreview';
import { useQuery } from '@apollo/client';
import {GET_RECOMMENDED_POSTS} from '../utils/queries'

const MainContent = () => {

  const { loading, data } = useQuery(GET_RECOMMENDED_POSTS,{
    fetchPolicy: 'cache-and-network',
  });

  const  postData = data?.getRecommendedPosts || []

  if (loading) {
    return (
    <>
      <h1>Loading...</h1>
      {/* {Array.from({ length: 5 }, (_, index) => ({
        title: 'Loading Article ' + (index + 1),
        content: 'Loading content...',
      }))} */}
    </>
    )
    
  }

  return (
    <div className="main-content">
      {postData.map((article, index) => (
        <ArticlePreview key={index} {...article} />
      ))}
    </div>
  );
};

export default MainContent;
