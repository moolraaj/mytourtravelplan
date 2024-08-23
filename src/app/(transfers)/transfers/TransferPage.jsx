'use client';

import React, { useEffect, useState } from 'react'
import LatestBlog from '@/Components/blogs';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';

function TransferPage() {
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
    <>
    <LatestBlog blogs={blogs}/>
    </>
  )
}

export default TransferPage