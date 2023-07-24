import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import { HomePage, LibraryPage, ProfilePage, StudyPage, LoginPage, RegisterPage } from './pages';import './App.css'

const App = () => {
  return <>
      <Router>
          <PageWrapper>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<RegisterPage />} />
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
};

export default App;
