'use client'
import React from 'react'
import Layout from '@/app/_common/layout/layout'
import Topbanner from '@/app/_common/layout/topbanner'
import CountryPage from './components/countryPage'
import useFetchAllSections from '@/hooks/useLoadApiHook'

export default function page() {
  let response=useFetchAllSections()
  let {countries}=response.data
  let reversedCountries=Array.isArray(countries)?[...countries]:[]
  return (
    <Layout>
    <div className='coutryinner'>
      <Topbanner/>
      <CountryPage country={reversedCountries}/>
    </div>
    </Layout>
  )
}
