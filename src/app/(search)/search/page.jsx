// /app/search/page.jsx

'use client';

import { useState, useEffect } from 'react';
import ContinentResults from '../components/ContinentResults';
import CityResults from '../components/CityResults';
import CountryResults from '../components/CountryResults';
import PackageResults from '../components/PackageResults';
import ActivityResults from '../components/ActivityResults';
import BlogResults from '../components/BlogResults';
import Layout from '@/app/_common/layout/layout';
import camerabg from '../../assets/home_images/camera-bg.png';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState({
        continents: [],
        cities: [],
        countries: [],
        packages: [],
        activities: [],
        blogs: []
      });
      
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('query') || '';
    setSearchQuery(query);
    if (query) {
      fetchSearchResults(query);
    }
  }, [window.location.search]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`/api/v1/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
  
      if (data.success) {
        // Ensure data.results is defined before setting state
        setSearchResults(data.results || {});
      } else {
        console.error('Search API response error:', data.message);
        setSearchResults({}); // Set empty results if there's an error
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults({}); // Set empty results if there's an error
    }
  };
  

  return (
    <>
    <Layout>
    <div className="search-page" >
      <div className="search_page_inner" style={{ backgroundImage: `url(${camerabg.src})` }}>
      <div className="search-results">
        {searchResults.continents && <ContinentResults results={searchResults.continents} />}
        {searchResults.countries && <CountryResults results={searchResults.countries} />}
        {searchResults.cities && <CityResults results={searchResults.cities} />}
        {searchResults.packages && <PackageResults results={searchResults.packages} />}
        {searchResults.activities && <ActivityResults results={searchResults.activities} />}
        {searchResults.blogs && <BlogResults results={searchResults.blogs} />}
      </div>
      </div>
    </div>
    </Layout>
    </>
  );
};

export default SearchPage;
