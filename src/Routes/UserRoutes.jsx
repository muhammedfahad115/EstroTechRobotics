import React from 'react'
import Login from '../Components/Login'
import Home from '../Pages/Home'
import { Route, Routes } from 'react-router-dom'

function UserRoutes() {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/' element={<Home />}></Route>
            </Routes>
        </>
    )
}

export default UserRoutes