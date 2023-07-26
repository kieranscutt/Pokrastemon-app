// PageWrapper.jsx
import React from 'react';
import NavBar from '../nav/index';
import '../nav/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router';

const PageWrapper = () => {
  return (
    <div>
      {/* Add common elements here, such as header, navigation, etc. */}
      <NavBar/>
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
