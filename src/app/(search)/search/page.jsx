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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search).get('query') || '';
        setSearchQuery(query);
        if (query) {
            fetchSearchResults(query);
        }
    }, [window.location.search]);

    const fetchSearchResults = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/v1/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (data.success) {
                setSearchResults(data.results || {});
            } else {
                console.error('Search API response error:', data.message);
                setSearchResults({}); // Set empty results if there's an error
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults({}); // Set empty results if there's an error
        } finally {
            setLoading(false);
        }
    };

    // Check if any results exist for a category
    const hasResults = (category) => searchResults[category] && searchResults[category].length > 0;

    return (
        <>
            <Layout>
                <div className="search-page">
                    <div className="search_page_inner" style={{ backgroundImage: `url(${camerabg.src})` }}>
                        <div className="search-results">
                            {loading ? (
                                <div className="loading">Loading...</div>
                            ) : (
                                <>
                                    {hasResults('continents') && <ContinentResults results={searchResults.continents} />}
                                    {hasResults('countries') && <CountryResults results={searchResults.countries} />}
                                    {hasResults('cities') && <CityResults results={searchResults.cities} />}
                                    {hasResults('packages') && <PackageResults results={searchResults.packages} />}
                                    {hasResults('activities') && <ActivityResults results={searchResults.activities} />}
                                    {hasResults('blogs') && <BlogResults results={searchResults.blogs} />}
                                    
                                    {Object.keys(searchResults).every(category => !hasResults(category)) && (
                                        <div className="no-results">No results found</div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default SearchPage;
