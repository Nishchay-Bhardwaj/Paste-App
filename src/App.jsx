import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './components/home'
import Paste from './components/paste'
import ViewPaste from './components/viewPaste'

const router = createBrowserRouter(
    [
      {
        path:"/",
        element:
        <div>
          <Navbar />
          <Home />
        </div>
      },
      {
        path:"/pastes",
        element:
        <div>
          <Navbar />
          <Paste />
        </div>
      },
      {
        path:"/pastes/:id",
        element:
        <div>
          <Navbar />
          <ViewPaste />
        </div>
      }
    ]
  );

function App() {

  return (
    <div className='main'>
    <RouterProvider router={router} />
    </div>
  )
}

export default App
