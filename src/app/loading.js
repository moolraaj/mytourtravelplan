'use client' 
import React from 'react'
import { Hourglass } from 'react-loader-spinner'
 
function loading() {
    return (
        <div className="loader_wrapper">
          <Hourglass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#CF0C2A', '#1802A0']}
                    />
            
        </div>


    )
}

export default loading