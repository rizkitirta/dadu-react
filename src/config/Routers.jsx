import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Game from '../pages/game-play'
import Home from '../pages/home'
import Layout from '../pages/layouts/layout'

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout children={<Home/>} />} />
            </Routes>
            <Routes>
                <Route path="/game-play/:id" element={<Layout children={<Game/>} />} />
            </Routes>
            <Routes>
                <Route path="/authentication/login" element={<Login />} />
            </Routes>
            <Routes>
                <Route path="/authentication/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers