'use client';
import {useMemo } from 'react';
import SendProps from './SendProps';
import useFetchAllSections from '@/hooks/useLoadApiHook';


export default function ApiData() {
    const response = useFetchAllSections();
    console.log(response);

    const {
        continents = [],
        countries = [],
        cities = [],
        packages = [],
        blogs = [],
        packageCategories = [],
        activities =[],
        pagination = []
    } = response.data || {};

    const { loading } = response;
    // Memoizing the Adminpage data
    const memoizedAdminpageData = useMemo(() => ({
        continent: continents,
        country: countries,
        city: cities,
        packages: packages,
        blogs: blogs,
        packagescat: packageCategories,
        activities: activities,
        pagination:pagination
    }), [continents, countries, cities, packages, blogs, packageCategories,activities,pagination]);

    return (
        <>
            <SendProps
                continent={memoizedAdminpageData.continent}
                loading={loading}
                country={memoizedAdminpageData.country}
                city={memoizedAdminpageData.city}
                packages={memoizedAdminpageData.packages}
                blogs={memoizedAdminpageData.blogs}
                packagescat={memoizedAdminpageData.packagescat}
                activities={memoizedAdminpageData.activities}
                pagination={memoizedAdminpageData.pagination}
            />
            
        </>
    )
}
