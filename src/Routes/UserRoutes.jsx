import React from 'react'
import Login from '../Components/Login'
import Home from '../Pages/Home'
import { Route, Routes } from 'react-router-dom'
import UserContext from '../Context/UserContext'
import Profile from '../Components/Profile'
import Devices from '../Components/Devices'
import DashBoard1 from '../Components/DashBoard1'
import Device1 from '../Components/Device1'
import Device2 from '../Components/Device2'

function UserRoutes() {
    return (
        <>
            <UserContext>
                <Routes>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/' element={<Home />}>
                    <Route path='/' element={<DashBoard1/>}></Route>
                        <Route path='profile' element={<Profile />}></Route>
                        <Route path='devices' element={<Devices />}></Route>
                        <Route path='device01' element={<Device1/>}></Route>
                        <Route path='device02' element={<Device2/>}></Route>
                    </Route>
                </Routes>
            </UserContext>
        </>
    )
}

export default UserRoutes