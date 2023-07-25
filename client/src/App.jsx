import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Nav/styles.css';
import { HomePage, LibraryPage, ProfilePage, StudyPage, LoginPage } from './pages';
// import './App.css';
import NavBar from './components/Nav';

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <PageWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/study' element={<StudyPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/library' element={<LibraryPage />} />
            <Route path='/library/:id' element={<LibraryPage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </PageWrapper>
      </Router>
    </>
  );
};

export default App;
