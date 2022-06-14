import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
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
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route 
              path='/' 
              element={<SearchBooks />} 
            />
            <Route 
              path='/saved' 
              element={<SavedBooks />} 
            />
            <Route 
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;


// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import SearchBooks from "./pages/SearchBooks";
// import SavedBooks from "./pages/SavedBooks";
// import Navbar from "./components/Navbar";

// import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";

// const client = new ApolloClient({
//   request: (operation) => {
//     const token = localStorage.getItem("id_token");

//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : "",
//       },
//     });
//   },
//   uri: "/graphql",
// });

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <>
//           <Navbar />
//           <Switch>
//             <Route exact path="/" component={SearchBooks} />
//             <Route exact path="/saved" component={SavedBooks} />
//             <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
//           </Switch>
//         </>
//       </Router>
//     </ApolloProvider>
//   );
// }

// export default App;