import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  return (
    <>
           <div className='sidebar'>
                <h3>Dashbroad</h3>
                <ul>
                    <li><Link to={"/darshboard"}>Home</Link></li>
                    <li><Link to={"/students"}>Students</Link></li>
                    <li><Link to={"/courses"}>Courses</Link></li>
                    <li><Link to={"/exams"}>Exams</Link></li>
                    <li><Link to={"/teacher"}>Teacher</Link></li>
                </ul>  
           </div>
    </>
  )
}



export const TopNav = () => {
  return (
    <>
      <h2 className='top-nav'>Academic Performance Evaluation</h2>
    </>
  )
}
