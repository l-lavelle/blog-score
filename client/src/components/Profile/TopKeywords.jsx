const TopKeywords = (props) => {

const sortedKeywords= props.keywords.sort(function(a, b) {
  return b.count-a.count
});

 const subsetKeywords= sortedKeywords.slice(0, 5);
let filteredKeywords = subsetKeywords.filter((user) => {
  return user.count > 0
});

  return (
    <>
    <h4 className='mt-3'>Current Top Interests</h4>
    {filteredKeywords.length>0?
    <>
    {filteredKeywords && filteredKeywords.map((keyword, index) => (
        <div key={index} className="mb-1">
          <li className="p-2 mb-1 fs-5">
             {keyword.keyword}<br />
          </li>
          
        </div>
      ))} </>:
      <div>
        <h6>No interests dectected yet. Go like some posts</h6>
      </div>}
    </>
  );
};

export default TopKeywords;