'use client'
import { EXPORT_ALL_APIS } from '@/utils/apis/api';
import React, { useEffect, useState } from 'react'
import { Watch } from 'react-loader-spinner';

function LayoutPageloading() {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const api = EXPORT_ALL_APIS();

            try {

                await Promise.all([
                    api.loadAllActivities(),
                    api.loadAllBlogs(),
                    api.loadAllCities(),
                    api.loadAllCitiesWithLowestPrices(),
                    api.loadAllContinents(),
                    api.loadAllCountries(),
                    api.loadAllPackages(),
                    api.loadAllPackagesActivities(),
                    api.loadAllRegisteredUsers(),
                    api.loadFooterDeatails()

                ]);
                setLoading(false);
            } catch (error) {
                console.log('problem found to fetching apis')
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (

            <>
                <div className="loader_wrapper" style={{zIndex:'999999999999999999999999999'}}>
                    <Watch
                        visible={true}
                        height="180"
                        width="180"
                        radius="48"
                        color="#CF0C2A"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </>
        )
    }

}

export default LayoutPageloading




