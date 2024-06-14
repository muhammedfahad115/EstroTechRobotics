import React from 'react'
import Login from '../Components/Login'
import Home from '../Pages/Home'
import { Route, Routes } from 'react-router-dom'
import UserContext from '../Context/UserContext'
import Profile from '../Components/Profile'

function UserRoutes() {
    return (
        <>
            <UserContext>
                <Routes>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/' element={<Home />}>
                        <Route path='profile' element={<Profile />}></Route>
                    </Route>
                </Routes>
            </UserContext>
        </>
    )
}

export default UserRoutes