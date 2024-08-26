


import LatestBlog from '@/Components/blogs';
import useFetchAllSections from '@/hooks/useLoadApiHook';
function TransferPage() {
  let response=useFetchAllSections()
  let {blogs}=response.data
  

   
  
    
  


  return (
    <>
    <LatestBlog blogs={blogs}/>
    </>
  )
}

export default TransferPage