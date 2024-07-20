import React from 'react'
import {TopNav, SideBar} from "./Menu"

const Darshboard = () => {
  return (
    <>
      <div className='bg-light'>
        <TopNav/>
        <div className="main-container">
                <SideBar></SideBar>
                
                <div className='sub-conteiner' >
                     Welcome to my attendence performance evaluation
                </div>
            </div>
      </div>
    </>
  )
}

export default Darshboard
