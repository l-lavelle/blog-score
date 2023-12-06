import {SINGLE_USER_COMMENTS} from '../../utils/queries'

const TopKeywords = (props) => {
 
//   const { loading, data } = useQuery(SINGLE_USER_COMMENTS,{
//     fetchPolicy: 'cache-and-network',
//   });

//   const commentData=data?.singleUserComments?.comments || []
 
const newwords= props.keywords.sort(function(a, b) {
  console.log(a)
  return b.count-a.count
});

const trial= newwords.slice(0, 5);
console.log(trial)

  return (
    <>
    <h1>Current Top Interests</h1>
    {trial && trial.map((keyword, index) => (
        <div key={index} className="card mb-3">
          <h4 className="card-header bg-dark text-light p-2 mb-1">
            {keyword.count} {keyword.keyword}<br />
          </h4>
          
        </div>
      ))}
    <h1>asdf</h1>
    </>
  );
};

export default TopKeywords;