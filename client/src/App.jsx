import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NavBar />
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-8 col-lg-10 col-xl-12">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
