import { useQuery } from '@apollo/client';
import { RECENT_POSTS_QUERY } from '../utils/queries';
import './Recent.css'
import ArticlePreview from './ArticlePreview';

function RecentlyViewedPosts() {
  const { loading, data } = useQuery(RECENT_POSTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
 
  const  postData = data?.recentPosts || []


  return (
    <div className="main-content">
      {postData.map((article, index) => (
        <ArticlePreview key={index} {...article} />
      ))}
    </div>
  );
}

export default RecentlyViewedPosts;
