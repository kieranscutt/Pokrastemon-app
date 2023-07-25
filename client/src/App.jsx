import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import { HomePage, LibraryPage, ProfilePage, StudyPage, LoginPage} from './pages';import './App.css'

const App = () => {
  return <>
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
};

export default App;
