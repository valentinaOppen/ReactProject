import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/header';
import Table from './components/table';

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;

const App = () => {
  return (
    <>
      <Header />
      <Table />
    </>
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/about">About</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     <Route path="/" Component={Home} />
    //     <Route path="/about" Component={About} />
    //   </div>
    // </Router>
  );
};

export default App;
