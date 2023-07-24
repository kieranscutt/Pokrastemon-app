import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Pages from './pages'
import {Header} from './components'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Header/>}>
        <Route index element={<Pages.Homepage/>}/>
        <Route path='/study' element={<Pages.Studypage/>}/>
        <Route path='/login' element={<Pages.Loginpage/>} />
        <Route path='./register' element={<Pages.Registerpage/>} />
      </Route>
    </Routes>
  )
}

export default App
