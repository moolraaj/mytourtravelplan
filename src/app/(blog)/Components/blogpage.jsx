'use client'
import React, { useEffect, useState } from 'react';


import { EXPORT_ALL_APIS } from '@/utils/apis/api';

import BlogCard from './blogCard';
import useFetchAllSections from '@/hooks/useLoadApiHook';
 

 




 

const BlogCardsContainer = () => {

  let response=useFetchAllSections()
   

  const {
    blogs = [],
} = response.data || {};
  


  

  return (
    <div className="blog-page">
      <BlogCard result={blogs}/>
    </div>
  );
};

export default BlogCardsContainer;
