

'use client'
import LatestBlog from '@/Components/blogs';
import useFetchAllSections from '@/hooks/useLoadApiHook';
import { PER_PAGE_LIMIT } from '@/utils/apis/api';

function TransferPage() {

  const { data } = useFetchAllSections(1, PER_PAGE_LIMIT); 

  if (!data || !data.blogs) return <p></p>;
  
  return (
    <>
    <LatestBlog blogs={data.blogs}/>
    </>
  )
}

export default TransferPage