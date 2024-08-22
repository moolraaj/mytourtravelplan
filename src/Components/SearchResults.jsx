
// /app/components/SearchResults.jsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formatQuery = (query) => query.trim().toLowerCase().replace(/\s+/g, '-');

const SearchResults = ({ query, closePopup }) => {
  const [results, setResults] = useState({
    continents: [],
    cities: [],
    countries: [],
    packages: [],
    activities: [],
    blogs: []
  });
  
  const router = useRouter();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/v1/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
          setResults(data.results || {});
        } else {
          console.error('Search API response error:', data.message);
          setResults({});
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults({});
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setResults({
        continents: [],
        cities: [],
        countries: [],
        packages: [],
        activities: [],
        blogs: []
      });
    }
  }, [query]);

  const handleResultClick = (title, type) => {
    const formattedQuery = formatQuery(title);
    router.push(`/search?query=${encodeURIComponent(formattedQuery)}`);
    closePopup();
  };

  return (
    <div className="searchResults">
      {results.continents.length > 0 && (
        <div>
          <h4>Continents</h4>
          {results.continents.map(item => (
            <div key={item._id} onClick={() => handleResultClick(item.title, 'continent')}>
              {item.title}
            </div>
          ))}
        </div>
      )}
      {results.countries.length > 0 && (
        <div>
          <h4>Countries</h4>
          {results.countries.map(item => (
            <div key={item._id} onClick={() => handleResultClick(item.title, 'country')}>
              {item.title}
            </div>
          ))}
        </div>
      )}
      {results.cities.length > 0 && (
        <div>
          <h4>Cities</h4>
          {results.cities.map(item => (
            <div key={item._id} onClick={() => handleResultClick(item.title, 'city')}>
              {item.title}
            </div>
          ))}
        </div>
      )}
      {results.packages.length > 0 && (
        <div>
          <h4>Packages</h4>
          {results.packages.map(item => (
            <div key={item._id} onClick={() => handleResultClick(item.title, 'package')}>
              {item.title}
            </div>
          ))}
        </div>
      )}
      {results.activities.length > 0 && (
        <div>
          <h4>Activities</h4>
          {results.activities.map(item => (
            <div key={item._id} onClick={() => handleResultClick(item.title, 'activity')}>
              {item.title}
            </div>
          ))}
        </div>
      )}
      {results.blogs.length > 0 && (
        <div>
          <h4>Blogs</h4>
          {results.blogs.map(item => (
            <div key={item._id} onClick={() => handleResultClick(item.title, 'blog')}>
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
