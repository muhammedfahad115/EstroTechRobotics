import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes'

function App() {
  return (
    <>
    <Routes>
      <Route path='/*' element={<UserRoutes/>}></Route>
    </Routes>
    </>
  )
}

export default App