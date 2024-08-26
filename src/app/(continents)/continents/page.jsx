'use client'
import React from 'react'


 
 
import useFetchAllSections from '@/hooks/useLoadApiHook'
import Layout from '@/app/_common/layout/layout'
import Topbanner from '@/app/_common/layout/topbanner'
import ContinentPage from './components/continentPage'


export default function page() {
  let response=useFetchAllSections()
  let {continents}=response.data
  let reversedContinents=Array.isArray(continents)?[...continents].reverse():[]
  return (
    <Layout>
    <div>
      <Topbanner/>
      <ContinentPage reversedContinents={reversedContinents}/>
    </div>
    </Layout>
  )
}
