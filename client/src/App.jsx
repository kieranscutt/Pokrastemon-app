import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import StudyPage from './pages/StudyPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import LibraryPage from './pages/LibraryPage';

const App = () => {
  return <>
      <Router>
          <PageWrapper>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path='/study' element={<StudyPage />} />
                  <Route path='/profile' element={<ProfilePage />} />
                  <Route path='/library' element={<LibraryPage />} />
                  <Route path='/library/:id' element={<LibraryPage />} />
                  <Route path="*" element={<NotFoundPage />} />
              </Routes>
          </PageWrapper>
      </Router>
  </>
};

export default App;
