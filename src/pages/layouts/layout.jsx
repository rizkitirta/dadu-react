import React from 'react'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'

function Layout(props) {
  return (
    <div className='container-xl'>
      <Navbar/>
      {props.children}
      <Footer/>
    </div>
  )
}

export default Layout