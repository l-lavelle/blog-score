import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';

// https://stackoverflow.com/questions/64957735/typeerror-cannot-assign-to-read-only-property-0-of-object-object-array-in
const TopKeywords = (props) => {

const sortedKeywords= [...props.keywords].sort(function(a, b) {
  return b.count-a.count
});

 const subsetKeywords= sortedKeywords.slice(0, 5);
let filteredKeywords = subsetKeywords.filter((user) => {
  return user.count > 0
});

const pieData=[]
const chartLabels=[]
filteredKeywords.forEach((element) => {
    pieData.push(element.count)
    chartLabels.push(element.keyword)
});

ChartJS.register(ArcElement, Tooltip,Legend);
  
  const data = {
    labels: chartLabels,
    // 
    datasets: [
      {
        label: 'Top Current Interests',
        data: pieData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
    <h5 className='mt-3 mb-3 text-center'>Current Top Interests</h5>
    {filteredKeywords.length>0?
    <>
     <Container className='d-flex justify-content-center align-items-center'> 
      <Row >
      <Col>
      <Pie data={data} />
      </Col>
      {/* <Col>
    {filteredKeywords && filteredKeywords.map((keyword, index) => (
        <div key={index} className="mb-1 d-flex justify-content-center align-items-center">
          <li className="p-2 mb-1 fs-5">
             {keyword.keyword}<br />
          </li>
          
        </div>
      ))} 
      </Col> */}
      {/* </Row>
      <Row xs={6}> */}
      
      </Row>
    </Container> 
    </>:
      <div>
        <h6>No interests dectected yet. Go like some posts</h6>
      </div>}
    </>
  );
};

export default TopKeywords;