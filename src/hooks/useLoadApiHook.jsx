// 'use client'
// import { useState, useEffect } from 'react';
// const useFetchAllSections = (page,limit) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`/api/v1/all-queries/get?page=${page}&limit=${limit}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const result = await response.json();
//         setData(result.result);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [page]);
//   return { data, loading};
// };
// export default useFetchAllSections;


'use client';
import { PER_PAGE_LIMIT } from '@/utils/apis/api';
import { useState, useEffect, useMemo } from 'react';

const useFetchAllSections = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/all-queries/get?page=${1}&limit=${PER_PAGE_LIMIT}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result.result);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData, loading };
};

export default useFetchAllSections;

