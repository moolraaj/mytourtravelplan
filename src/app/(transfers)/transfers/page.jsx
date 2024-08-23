
'use client';

import Layout from '@/app/_common/layout/layout'
import React, { useEffect, useState } from 'react'
import CarOptions from '../Components/transferinnersection'
import WelcomeCard from '../Components/sidebar'
import Topbanner from '@/app/_common/layout/topbanner'
import LatestBlog from '@/Components/blogs';
import transferbg from '../../assets/home_images/transfer-bg.png';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
function page() {

  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    let api = EXPORT_ALL_APIS();
    let data;
    data = await api.loadAllBlogs();
    setBlogs(data);
  };

  useEffect(() => {
    fetchData();
  }, [])




  return (
    <Layout>
      <Topbanner />

      <div className='vechile-sidebar' style={{ backgroundImage: `url(${transferbg.src})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className="inner-w-container vechile-sidebar-inner">
          <CarOptions />
          <WelcomeCard />
        </div>
      </div>

      <div className='blog_custom'>
        <LatestBlog blogs={blogs}/>
      </div>

    </Layout>
  )
}

export default page