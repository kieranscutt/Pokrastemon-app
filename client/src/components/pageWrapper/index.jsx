// PageWrapper.jsx
import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div>
      {/* Add common elements here, such as header, navigation, etc. */}
      <header>
      </header>
      <nav>
        {/* Add navigation links here */}
      </nav>

      {/* Content of the specific page */}
      {children}

      {/* Add common elements here, such as footer, etc. */}
      <footer>
        {/* Add footer content here */}
      </footer>
    </div>
  );
};

export default PageWrapper;
