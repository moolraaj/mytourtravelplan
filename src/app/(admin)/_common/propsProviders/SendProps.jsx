import React from 'react'
import ActivityPage from '../../admin/(activities)/activities/page'
import BlogPage from '../../admin/(blog)/blog/page'
import BookingPage from '../../admin/(bookings)/bookings/page'
import CityPage from '../../admin/(cities)/cities/page'
import ContactsPage from '../../admin/(contacts)/contacts/page'
import ContinentPage from '../../admin/(continents)/continents/page'
import CountryPage from '../../admin/(countries)/countries/page'
import FlightsPage from '../../admin/(flights)/flights/page'
import FooterPage from '../../admin/(footer)/footer/page'
import Packages from '../../admin/(packages)/packages/page'

function SendProps({loading,continent,country,city,packages,blogs,packagescat}) {
  return (
    <>
    <ActivityPage />
    <BlogPage blogs={blogs} loading={loading}/>
    <BookingPage/>
    <CityPage city={city} loading={loading}/>
    <ContactsPage/>
    <ContinentPage continent={continent} loading={loading}/>
    <CountryPage country={country} loading={loading}/>
    <Packages packages={packages} loading={loading}/>
    <FlightsPage/>
    <FooterPage/>
    </>
  )
}

export default SendProps