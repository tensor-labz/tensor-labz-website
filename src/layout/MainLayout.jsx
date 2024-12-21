import React, { memo } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
    return (
      <>
  <NavBar/>
  <Outlet/>
      </>
          
    )
}

export default memo(MainLayout)
