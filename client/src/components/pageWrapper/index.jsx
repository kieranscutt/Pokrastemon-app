// PageWrapper.jsx
import React from 'react';
import NavBar from '../Nav/index';
// import '../Nav/styles.css'
import { Outlet } from 'react-router';

const PageWrapper = () => {
  return (
    <div>
      {/* Add common elements here, such as header, navigation, etc. */}
      <NavBar/>
      <header>
      <h1>Pokrastemon Adventures</h1>
      </header>
      {/* Content of the specific page */}
      <Outlet/>

      {/* Add common elements here, such as footer, etc. */}
      <footer>
        {/* Add footer content here */}
      </footer>
    </div>
  );
};

export default PageWrapper;
