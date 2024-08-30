'use client';
import {useMemo } from 'react';
import SendProps from './SendProps';

function ApiData() {
    const response = useFetchAllSections();
    console.log(response);

    const {
        continents = [],
        countries = [],
        cities = [],
        packages = [],
        blogs = [],
        packageCategories = []
    } = response.data || {};

    const { loading } = response;
    // Memoizing the homepage data
    const memoizedHomepageData = useMemo(() => ({
        continent: continents,
        country: countries,
        city: cities,
        packages: packages,
        blogs: blogs,
        packagescat: packageCategories
    }), [continents, countries, cities, packages, blogs, packageCategories]);

    return (
        <>
            <SendProps
                continent={memoizedHomepageData.continent}
                loading={loading}
                country={memoizedHomepageData.country}
                city={memoizedHomepageData.city}
                packages={memoizedHomepageData.packages}
                blogs={memoizedHomepageData.blogs}
                packagescat={memoizedHomepageData.packagescat}

            />
        </>
    )
}

export default ApiData