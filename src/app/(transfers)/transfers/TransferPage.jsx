'use client';

import React, { useEffect, useState } from 'react'
import LatestBlog from '@/Components/blogs';
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import useFetchAllSections from '@/hooks/useLoadApiHook';

function TransferPage() {
  let response=useFetchAllSections()
  let {blogs}=response.data
  

   
  
    
  


  return (
    <>
    <LatestBlog blogs={blogs}/>
    </>
  )
}

export default TransferPage