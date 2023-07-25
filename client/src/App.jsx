import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageWrapper from './components/pageWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/nav/styles.css';
import { HomePage, LibraryPage, ProfilePage, StudyPage, LoginPage } from './pages';
// import './App.css';
import NavBar from './components/nav/index';

const App = () => {
  return (
    <>
        <NavBar/>
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
    </>
  );
};

export default App;
