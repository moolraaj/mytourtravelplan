'use client'
import React from 'react'

import Explorations from './Components/citiesinnercards'
import Layout from '../../_common/layout/layout'
import Topbanner from '@/app/_common/layout/topbanner'
import useFetchAllSections from '@/hooks/useLoadApiHook'


export default function page() {
  let response=useFetchAllSections()
  
  const {
    cities = [],
} = response.data || {};
 
  let reversedCities=Array.isArray(cities)?[...cities].reverse():[]
  return (
    <Layout>
    <div>
      <Topbanner/>
      <Explorations reversedCities={reversedCities}/>
    </div>
    </Layout>
  )
}
