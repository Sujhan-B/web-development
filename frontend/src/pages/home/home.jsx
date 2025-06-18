import React, { useState } from 'react'
import './home.css'
import Header from '../../components/header/header'
import Exploremenu from '../../components/exploremenu/exploremenu'
import ServiceDisplay from '../../components/servicedisplay/ServiceDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
    const[category,setcategory] = useState("All")

  return (
    <div>
        <Header/>
        <Exploremenu category={category} setcategory={setcategory}/>
        <ServiceDisplay category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home
